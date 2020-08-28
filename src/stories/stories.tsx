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

const initialstore = { dog: { name: "Sanuk" }, bird: { name: "Poly" } };

export const Pets: React.FunctionComponent<{}> = (props) => {
  return (
    <ConfigiaPane english="Pet Settings" store={initialstore}>
      <ConfigiaGroup english="Dog">
        <ConfigiaInput
          english="Name"
          get={(store: any) => store.dog.name}
          set={(store: any, v: string) => {
            store.dog.name = v;
          }}
        />
        <ConfigiaBoolean
          value={true}
          english="Friendly"
          englishSecondary="Does this dog like other dogs?"
        ></ConfigiaBoolean>
      </ConfigiaGroup>
      <ConfigiaGroup english="Bird">
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
