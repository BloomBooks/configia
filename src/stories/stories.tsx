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

import { Store } from "pullstate";

interface IPetSettings {
  dog: { name: string; friendly: boolean };
  bird: { name: string; kind: string, nameError?:string };
}

const settings = new Store<IPetSettings>({
  dog: { name: "Sanuk", friendly: true },
  bird: { name: "Poly!", kind: "parrot" },
});

export const Pets: React.FunctionComponent<{}> = (props) => {
  return (
    <ConfigiaPane english="Pet Settings" store={settings}>
      <ConfigiaGroup english="Dog">
        <ConfigiaInput
          english="Name"
          get={(d: IPetSettings) => d.dog.name}
          set={(d: IPetSettings, v: string) => {
            d.dog.name = v;
          }}
        />
        <ConfigiaBoolean
          value={true}
          english="Friendly"
          englishSecondary="Does this dog like other dogs?"
          get={(d: IPetSettings) => d.dog.friendly}
          set={(d: IPetSettings, v: boolean) => {
            d.dog.friendly = v;
          }}
        ></ConfigiaBoolean>
      </ConfigiaGroup>
      <ConfigiaGroup english="Bird">
        <ConfigiaInput
          english="Name"
          get={(d: IPetSettings) => d.bird.name}
          set={(d: IPetSettings, v: string) => {
            d.bird.name = v;
            }
          }
          getErrorMessage={(d: IPetSettings) => (d.bird.name.indexOf("!")>-1) ? "No punctuation allowed":undefined}
        />
        <ConfigiaRadioGroup
          english="Kind"
          get={(d: IPetSettings) => d.bird.kind}
          set={(d: IPetSettings, v: string) => {
            d.bird.kind = v;
          }}
        >
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
