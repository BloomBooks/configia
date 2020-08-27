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

export const Pets: React.FunctionComponent<{}> = (props) => {
  return (
    <ConfigiaPane english="Pet Settings">
      <ConfigiaGroup english="Dog">
        <ConfigiaInput value={"Sabai"} english="Name" />
        <ConfigiaBoolean
          value={true}
          english="Friendly"
          englishSecondary="Does this dog like other dogs?"
        ></ConfigiaBoolean>
      </ConfigiaGroup>
      <ConfigiaGroup english="Bird">
        <ConfigiaInput value={"Cruz"} english="Name" />
        <ConfigiaBoolean value={true} english="Wings" />
        <ConfigiaRadioGroup value={"parrot"} english="Wings">
          <ConfigiaRadio english="Parakeet" value={"parakeet"} />
          <ConfigiaRadio english="Parrot" value={"parrot"} />
        </ConfigiaRadioGroup>
      </ConfigiaGroup>
    </ConfigiaPane>
  );
};
export default {
  title: "Pets",
  component: () => <Pets />,
};
