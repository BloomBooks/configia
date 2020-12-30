// this engages a babel macro that does cool emotion stuff (like source maps). See https://emotion.sh/docs/babel-macros
import css from "@emotion/css/macro";
// these two lines make the css prop work on react elements
import { jsx } from "@emotion/core";
/** @jsx jsx */
import React, {
  useMemo,
  useState,
  useEffect,
  ReactElement,
  Fragment,
} from "react";
import Button from "@material-ui/core/Button";
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
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Field, Formik, useField, useFormikContext } from "formik";

type valueGetter = () => Object;

interface IConfigiaPaneProps {
  label: string;
  initialValues: object;
  children:
    | React.ReactElement<typeof ConfigiaGroup>
    | React.ReactElement<typeof ConfigiaGroup>[];
  setValueGetter?: (vg: valueGetter) => void;
  showSearch?: boolean;
}
const tabBarWidth = "200px";
export const ConfigiaPane: React.FunctionComponent<IConfigiaPaneProps> = (
  props
) => {
  const [currentTab, setCurrentTab] = useState(0);
  const groupLinks = useMemo(() => {
    return React.Children.map(props.children, (g: any) => (
      <Tab
        key={g.props.label}
        label={g.props.label}
        css={css`
          font-weight: 500;
        `}
      ></Tab>
    ));
  }, [props.children]);

  const wrappedGroups = React.Children.map(
    props.children,
    (c: React.ReactElement<typeof ConfigiaGroup>, index) => {
      return (
        <ConfigiaGroupWrapper selected={currentTab === index}>
          {React.cloneElement(c as React.ReactElement<any>, {
            ...c.props,
          })}
        </ConfigiaGroupWrapper>
      );
    }
  );

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
      }) => {
        if (props.setValueGetter)
          props.setValueGetter(() => {
            return values;
          });
        return (
          <form
            onSubmit={handleSubmit}
            css={css`
              flex-grow: 1;
            `}
          >
            <ConfigiaAppBar
              label={props.label}
              showSearch={props.showSearch}
              values={values}
            />
            <div
              css={css`
                background-color: #f8f9fa;
                height: 100%;
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
                  width: 600px;
                  //overflow-y: scroll; //allows us to scroll the groups without
                  //scrolling the heading tabs
                  overflow-y: auto;
                `}
              >
                {wrappedGroups}
              </div>
            </div>
          </form>
        );
      }}
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

export const ConfigiaRowOneColumn: React.FunctionComponent<{
  label: string;
  labelSecondary?: string;
  control: React.ReactNode;
}> = (props) => {
  return (
    <ListItem
      className={"MuiListItem-alignItemsFlexStart"}
      css={css`
        flex-direction: column;
      `}
    >
      <ListItemText primary={props.label} secondary={props.labelSecondary} />
      {props.control}
    </ListItem>
  );
};

export const ConfigiaRowTwoColumns: React.FunctionComponent<{
  label: string;
  labelSecondary?: string;
  control: React.ReactNode;
}> = (props) => {
  return (
    <ListItem>
      <ListItemText
        css={css`
          max-width: 300px;
        `}
        primary={props.label}
        secondary={props.labelSecondary}
      />
      <ListItemSecondaryAction>{props.control}</ListItemSecondaryAction>
    </ListItem>
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
    <ConfigiaRowTwoColumns
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
    ></ConfigiaRowTwoColumns>
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

  return <ConfigiaRowTwoColumns control={control} {...props} />;
};

export const ConfigiaRadioGroup: React.FunctionComponent<{
  name: string;
  label: string;
}> = (props) => {
  return (
    // I could imagine wanting the radio buttons in the right column. There aren't any examples of this in chrome:settings.
    // Note that normally in chrome:settings, radios are the sole child of an entire group (e.g. "on startup", "cookie settings",
    // "safe browsing"). When the choices are short and don't need explanation, then a combobox is used instead (e.g. "Search engine")
    // But to do that, we'll have to fix some css problems (e.g. the radio doesn't know its width and so doesn't line up properly
    // on its left edge.)
    <ConfigiaRowOneColumn
      {...props}
      control={<ConfigiaRadioGroupRaw {...props} />}
    ></ConfigiaRowOneColumn>
  );
};
export const ConfigiaRadioGroupRaw: React.FunctionComponent<{
  name: string;
  label: string;
}> = (props) => {
  const [field] = useField(props.name);
  return (
    //<Field component={RadioGroup} name={props.name} label={props.label}>
    <RadioGroup {...field} {...props}>
      {React.Children.map(props.children, (c) => {
        const choice = c as ReactElement<{
          label: string;
          value: string;
        }>;
        return (
          <FormControlLabel
            key={choice.props.value}
            value={choice.props.value}
            control={<Radio />}
            label={choice.props.label}
          />
        );
      })}
    </RadioGroup>
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

// Use for things like a file or folder chooser.
export const ConfigiaChooserButton: React.FunctionComponent<{
  name: string;
  label: string;
  labelSecondary?: string;
  buttonLabel: string;
  chooseAction: (currentValue: string) => string;
}> = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);

  return (
    <ConfigiaRowTwoColumns
      {...props}
      control={
        <Fragment>
          <Button
            disabled={true}
            variant={"outlined"}
            onClick={() => {
              const newValue = props.chooseAction(field.value);
              setFieldValue(props.name, newValue);
            }}
          >
            {props.buttonLabel}
          </Button>

          <div>{field.value}</div>
        </Fragment>
      }
    ></ConfigiaRowTwoColumns>
  );
};
