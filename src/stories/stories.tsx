// this engages a babel macro that does cool emotion stuff (like source maps). See https://emotion.sh/docs/babel-macros
import css from "@emotion/css/macro";
// these two lines make the css prop work on react elements
import { jsx } from "@emotion/core";
/** @jsx jsx */

import React from "react";
import { action } from "@storybook/addon-actions";

import {
  ConfigiaPane,
  ConfigiaGroup,
  ConfigiaInput,
  ConfigiaBoolean,
  ConfigiaRadioGroup,
  ConfigiaRadio,
  ConfigiaChooserButton,
} from "../ConfigiaPane";
import Button from "@material-ui/core/Button";

interface IPetSettings {
  dog: { name: string; friendly: boolean };
  bird: { name: string; kind: string; nameError?: string };
}
const initialValues = {
  dog: { name: "Sanuk", friendly: true },
  bird: { name: "Poly!", kind: "parrot" },
};

export const Pets: React.FunctionComponent<{}> = (props) => {
  let getCurrentValues: () => object;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 300px;
      `}
    >
      <Button
        variant={"contained"}
        onClick={() => {
          console.log(getCurrentValues());
        }}
        css={css`
          width: 174px;
          margin: 20px !important;
          margin-left: auto !important;
        `}
      >
        List Values in Console
      </Button>
      <ConfigiaPane
        label="Pet Settings"
        initialValues={initialValues}
        setValueGetter={(fn) => (getCurrentValues = fn)}
      >
        <ConfigiaGroup label="Dog">
          <ConfigiaInput name="dog.name" label="Name" />
          <ConfigiaBoolean
            name="dog.friendly"
            label="Friendly"
            labelSecondary="Does this dog like other dogs?"
          ></ConfigiaBoolean>
          <ConfigiaChooserButton
            name="dog.photos"
            label="Folder of dog photos"
            labelSecondary="What does the dog look like?"
            buttonLabel="Choose..."
            chooseAction={(currentValue: string) => {
              return "x" + (currentValue || "");
            }}
          ></ConfigiaChooserButton>
        </ConfigiaGroup>
        <ConfigiaGroup label="Bird">
          <ConfigiaInput
            name="bird.name"
            label="Name"
            getErrorMessage={(d: IPetSettings) =>
              d.bird.name.indexOf("!") > -1
                ? "No punctuation allowed"
                : undefined
            }
          />
          <ConfigiaRadioGroup name="bird.kind" label="Kind">
            <ConfigiaRadio label="Parakeet" value="parakeet" />
            <ConfigiaRadio label="Parrot" value="parrot" />
          </ConfigiaRadioGroup>
        </ConfigiaGroup>
      </ConfigiaPane>
    </div>
  );
};
export default {
  title: "Pets",
  component: () => <Pets />,
};
