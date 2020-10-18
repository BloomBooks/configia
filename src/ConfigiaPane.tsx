// this engages a babel macro that does cool emotion stuff (like source maps). See https://emotion.sh/docs/babel-macros
import css from "@emotion/css/macro";
// these two lines make the css prop work on react elements
import { jsx } from "@emotion/core";
/** @jsx jsx */
import React, { useMemo, useState, useEffect, ReactElement } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { ConfigiaAppBar } from "./ConfigiaAppBar";

import { TextField, Checkbox, Switch } from "formik-material-ui";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { Field, Formik } from "formik";

interface IConfigiaPaneProps {
  label: string;
  initialValues: object;
  children: React.ReactElement<typeof ConfigiaGroup>[];
}
const tabBarWidth = "200px";
export const ConfigiaPane: React.FunctionComponent<IConfigiaPaneProps> = (
  props
) => {
  const [currentTab, setCurrentTab] = useState(0);

  const groupLinks = useMemo(() => {
    return props.children.map((g: any) => (
      <Tab
        label={g.props.label}
        css={css`
          font-weight: 500;
        `}
      ></Tab>
    ));
  }, [props.children]);

  const wrappedGroups = React.Children.map(props.children, (c, index) => {
    return (
      <ConfigiaGroupWrapper selected={currentTab === index}>
        {/* {c} */}
        {React.cloneElement(c as React.ReactElement<any>, {
          ...c.props,
        })}
      </ConfigiaGroupWrapper>
    );
  });

  return (
    <Formik initialValues={props.initialValues} onSubmit={(values) => {}}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <ConfigiaAppBar label={props.label} />
          <div
            css={css`
              background-color: #f8f9fa;
              height: 100vh;
              display: flex;

              .MuiTab-wrapper {
                text-align: left;
                align-items: start;
              }
            `}
          >
            <Tabs
              value={currentTab}
              onChange={(event: React.ChangeEvent<{}>, index: number) => {
                setCurrentTab(index);
              }}
              centered={false}
              orientation="vertical"
              css={css`
                width: ${tabBarWidth};
                padding-left: 12px;
                .MuiTabs-indicator {
                  display: none;
                }
                .Mui-selected {
                  font-weight: bold;
                }
              `}
            >
              {groupLinks}
            </Tabs>
            <div
              id="groups"
              css={css`
                width: 500px;
                overflow-y: scroll; //allows us to scroll the groups without scrolling the heading tabs
              `}
            >
              {wrappedGroups}
            </div>
          </div>{" "}
        </form>
      )}
    </Formik>
  );
};

export const ConfigiaGroupWrapper: React.FunctionComponent<{
  selected: boolean;
}> = (props) => {
  const groupRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (props.selected) {
      groupRef.current?.scrollIntoView();
    }
  }, [props.selected]);
  return <div ref={groupRef}>{props.children}</div>;
};

export const ConfigiaGroup: React.FunctionComponent<{
  label: string;
}> = (props) => {
  const childrenWithStore = React.Children.map(props.children, (c, index) => {
    if (React.isValidElement(c)) {
      return React.cloneElement(c, {
        ...c.props,
      });
    } else return null;
  });

  return (
    <React.Fragment>
      <Typography
        variant="h2"
        css={css`
          font-size: 18px !important;
          margin-top: 21px !important;
          margin-bottom: 12px !important;
        `}
      >
        {props.label}
      </Typography>
      <Paper
        elevation={2}
        css={css`
          width: 100%;
        `}
      >
        <List
          component="nav"
          css={css`
            width: 100%;
          `}
        >
          {joinChildren(childrenWithStore, <Divider component="li" />)}
        </List>
      </Paper>
    </React.Fragment>
  );
};

function joinChildren(children: any, renderSeparator: any) {
  return children.reduce(
    (result: any, child: React.ReactNode, index: number) => {
      if (index < children.length - 1) {
        return result.concat(child, renderSeparator);
      }
      return result.concat(child);
    },
    []
  );
}

export const ConfigiaRow: React.FunctionComponent<{
  label: string;
  labelSecondary?: string;
  control: React.ReactNode;
}> = (props) => {
  return (
    <React.Fragment>
      <ListItem button>
        <ListItemText primary={props.label} secondary={props.labelSecondary} />
        <ListItemSecondaryAction>{props.control}</ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>
  );
};

// function getCheckedStateProps(props: any) {
//   return {
//     checked: props.store!.useState(props.get),
//     onChange: (e: any) =>
//       props.store!.update((s: any) => props.set(s, e.target.checked)),
//   };
// }
// function getStringStateProps(props: any) {
//   return {
//     value: props.store!.useState(props.get),
//     error: props.store!.useState(
//       props.getErrorMessage ?? ((s: any) => undefined)
//     ),
//     helperText: props.store!.useState(
//       props.getErrorMessage ?? ((s: any) => undefined)
//     ),
//     onChange: (e: any) =>
//       props.store!.update((s: any) => props.set(s, e.target.value)),
//   };
// }
export const ConfigiaInput: React.FunctionComponent<{
  name: string;
  label: string;
  getErrorMessage?: (data: any) => string | undefined;
}> = (props) => {
  return (
    <ConfigiaRow
      {...props}
      control={
        // <TextField  {...getStringStateProps(props)}></TextField>
        <Field
          component={TextField}
          name={props.name}
          type="text"
          label={props.label}
        />
      }
    ></ConfigiaRow>
  );
};

export const ConfigiaBoolean: React.FunctionComponent<{
  name: string;
  label: string;
  labelSecondary?: string;
  immediateEffect?: boolean;
}> = (props) => {
  const control = !!props.immediateEffect ? (
    <Field
      component={Switch}
      type="checkbox"
      name={props.name}
      label={props.label}
    />
  ) : (
    <Field
      component={Checkbox}
      type="checkbox"
      name={props.name}
      label={props.label}
    />
  );

  return <ConfigiaRow control={control} {...props} />;
};

export const ConfigiaRadioGroup: React.FunctionComponent<{
  name: string;
  label: string;
}> = (props) => {
  return (
    <ConfigiaRow
      {...props}
      control={
        <Field component={RadioGroup} name={props.name} label={props.label}>
          {React.Children.map(props.children, (c) => {
            const configiaRadio = c as ReactElement<{
              label: string;
              value: string;
            }>;
            return (
              <FormControlLabel
                value={configiaRadio.props.value}
                control={<Radio />}
                label={configiaRadio.props.label}
              />
            );
          })}
        </Field>
      }
    ></ConfigiaRow>
  );
};

export const ConfigiaRadio: React.FunctionComponent<{
  value: any;
  label: string;
}> = (props) => {
  return (
    <React.Fragment>
      <ListItem button>
        <FormControlLabel
          value={props.value}
          control={<Radio />}
          label={props.label}
        />
      </ListItem>
    </React.Fragment>
  );
};
