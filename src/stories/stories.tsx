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
  ConfigiaConditional,
} from "../ConfigiaPane";
import Button from "@material-ui/core/Button";

interface IPetSettings {
  dog: { name: string; friendly: boolean };
  bird: { name: string; kind: string; nameError?: string };
}
const initialPetValues = {
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
      <ConfigiaPane
        label="Pet Settings"
        initialValues={initialPetValues}
        showSearch={true}
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

const initialLametaValues = {
  files: { useLargeFileFolder: false },
};

export const Lameta: React.FunctionComponent<{}> = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 300px;
      `}
    >
      <ConfigiaPane
        label="lameta Settings"
        initialValues={initialLametaValues}
        showSearch={true}
      >
        <ConfigiaGroup label="Files">
          <ConfigiaBoolean
            name="files.useLargeFileFolder"
            label="Use Large File Folder"
            labelSecondary="Avoid copying in large files that you already keep somewhere else (e.g. an external drive)."
          ></ConfigiaBoolean>
          <ConfigiaConditional
            enableWhen={(values: any) => values.files.useLargeFileFolder}
          >
            <ConfigiaChooserButton
              name="files.largeFileFolder"
              label="Large File Folder Location"
              buttonLabel="Choose..."
              chooseAction={(currentValue: string) => {
                return "x" + (currentValue || "");
              }}
            ></ConfigiaChooserButton>
          </ConfigiaConditional>
        </ConfigiaGroup>
      </ConfigiaPane>
    </div>
  );
};

export default {
  title: "Pets",
  component: () => <Pets />,
};
