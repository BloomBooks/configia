// this engages a babel macro that does cool emotion stuff (like source maps). See https://emotion.sh/docs/babel-macros
import css from "@emotion/css/macro";
// these two lines make the css prop work on react elements
import { jsx } from "@emotion/core";
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { ConfigiaAppBar } from "./ConfigiaAppBar";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

import { Store } from "pullstate";

interface IConfigiaPaneProps {
  english: string;
  store: object;
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
        label={g.props.english}
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
          store: props.store,
        })}
        ;
      </ConfigiaGroupWrapper>
    );
  });

  return (
    <div>
      <ConfigiaAppBar english={props.english} />
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
      </div>
    </div>
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
  english: string;
  store?: object;
}> = (props) => {
  const childrenWithStore = React.Children.map(props.children, (c, index) => {
    if (React.isValidElement(c)) {
      return React.cloneElement(c, {
        ...c.props,
        store: props.store,
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
        {props.english}
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
  english: string;
  englishSecondary?: string;
  control: React.ReactNode;
}> = (props) => {
  return (
    <React.Fragment>
      <ListItem button>
        <ListItemText
          primary={props.english}
          secondary={props.englishSecondary}
        />
        <ListItemSecondaryAction>{props.control}</ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>
  );
};

function getCheckedStateProps(props: any) {
  return {
    checked: props.store!.useState(props.get),
    onChange: (e: any) =>
      props.store!.update((s: any) => props.set(s, e.target.checked)),
  };
}
function getStringStateProps(props: any) {
  return {
    value: props.store!.useState(props.get),
    error: props.store!.useState(props.getErrorMessage ?? ((s:any)=>undefined)),
    helperText: props.store!.useState(props.getErrorMessage ?? ((s:any)=>undefined)),
    onChange: (e: any) =>
      props.store!.update((s: any) => props.set(s, e.target.value)),

  };
}
export const ConfigiaInput: React.FunctionComponent<{
  english: string;
  get: (data: any) => string;
  getErrorMessage?: (data: any) => string | undefined;
  set: (data: any, v: string) => void;
  store?: Store;
}> = (props) => {
  return (
    <ConfigiaRow
      {...props}
      control={<TextField  {...getStringStateProps(props)}></TextField>}
    ></ConfigiaRow>
  );
};

export const ConfigiaBoolean: React.FunctionComponent<{
  value: boolean;
  english: string;
  englishSecondary?: string;
  immediateEffect?: boolean;
  get: (data: any) => boolean;
  set: (data: any, v: boolean) => void;
  store?: Store;
}> = (props) => {
  const control = !!props.immediateEffect ? (
    <Switch {...getCheckedStateProps(props)} />
  ) : (
    <Checkbox {...getCheckedStateProps(props)} />
  );

  return <ConfigiaRow control={control} {...props} />;
};

export const ConfigiaRadioGroup: React.FunctionComponent<{
  english: string;
  get: (data: any) => string;
  set: (data: any, v: string) => void;
}> = (props) => {
  return (
    <RadioGroup name={props.english} {...getStringStateProps(props)}>
      {props.children}
    </RadioGroup>
  );
};

export const ConfigiaRadio: React.FunctionComponent<{
  value: any;
  english: string;
}> = (props) => {
  const control = (
    <FormControlLabel
      value={props.value}
      control={<Radio />}
      label={props.english}
    />
  );

  return (
    <React.Fragment>
      <ListItem button>
        <FormControlLabel
          value={props.value}
          control={<Radio />}
          label={props.english}
        />
      </ListItem>
    </React.Fragment>
  );
};
