// this engages a babel macro that does cool emotion stuff (like source maps). See https://emotion.sh/docs/babel-macros
import css from "@emotion/css/macro";
// these two lines make the css prop work on react elements
import { jsx } from "@emotion/core";
/** @jsx jsx */
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {
  fade,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

export const SabaiDialog: React.FunctionComponent<{}> = (props) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Settings</Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search settings"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
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
          centered={false}
          orientation="vertical"
          css={css`
            width: 200px;
          `}
        >
          <Tab label="Dog"></Tab>
          <Tab label="Bird"></Tab>
        </Tabs>
        <div
          css={css`
            width: 500px;
          `}
        >
          <Typography
            variant="h2"
            css={css`
              font-size: 18px !important;
              margin-top: 21px !important;
              margin-bottom: 12px !important;
            `}
          >
            Dog
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
              <ListItem button>
                <ListItemText primary="Name" />
              </ListItem>
              <Divider component="li" />
              <ListItem button>
                <ListItemText
                  primary="Socialized"
                  secondary={"Does this dog like other dogs?"}
                />
                <ListItemSecondaryAction>
                  <Switch checked={true} name="checkedA" />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider component="li" />
              <ListItem button>
                <ListItemText primary="Size" />
              </ListItem>
            </List>
          </Paper>
        </div>
      </div>
    </div>
  );
};
