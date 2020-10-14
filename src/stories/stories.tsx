import React from "react";
import { action } from "@storybook/addon-actions";

import {
  ConfigiaPane,
  ConfigiaGroup,
  ConfigiaInput,
  ConfigiaBoolean,
  ConfigiaRadioGroup,
  ConfigiaRadio,
} from "../ConfigiaPane";

interface IPetSettings {
  dog: { name: string; friendly: boolean };
  bird: { name: string; kind: string; nameError?: string };
}
const initialValues = {
  dog: { name: "Sanuk", friendly: true },
  bird: { name: "Poly!", kind: "parrot" },
};

export const Pets: React.FunctionComponent<{}> = (props) => {
  return (
    <ConfigiaPane label="Pet Settings" initialValues={initialValues}>
      <ConfigiaGroup label="Dog">
        <ConfigiaInput name="dog.name" label="Name" />
        <ConfigiaBoolean
          name="dog.friendly"
          label="Friendly"
          labelSecondary="Does this dog like other dogs?"
        ></ConfigiaBoolean>
      </ConfigiaGroup>
      <ConfigiaGroup label="Bird">
        <ConfigiaInput
          name="bird.name"
          label="Name"
          getErrorMessage={(d: IPetSettings) =>
            d.bird.name.indexOf("!") > -1 ? "No punctuation allowed" : undefined
          }
        />
        <ConfigiaRadioGroup name="bird.kind" label="Kind">
          <ConfigiaRadio label="Parakeet" value="parakeet" />
          <ConfigiaRadio label="Parrot" value="parrot" />
        </ConfigiaRadioGroup>
      </ConfigiaGroup>
    </ConfigiaPane>
  );
};
export default {
  title: "Pets",
  component: () => <Pets />,
};
