import {
  ConfigiaPane,
  ConfigiaGroup,
  ConfigiaInput,
  ConfigiaBoolean,
} from "./ConfigiaPane";
import React from "react";

export const TestPane: React.FunctionComponent<{}> = (props) => {
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
      </ConfigiaGroup>
      <ConfigiaGroup english="Bird">
        <ConfigiaInput value={"Cruz"} english="Name" />
        <ConfigiaBoolean value={true} english="Wings" />
      </ConfigiaGroup>
      <ConfigiaGroup english="Bird">
        <ConfigiaInput value={"Cruz"} english="Name" />
        <ConfigiaBoolean value={true} english="Wings" />
      </ConfigiaGroup>
      <ConfigiaGroup english="Bird">
        <ConfigiaInput value={"Cruz"} english="Name" />
        <ConfigiaBoolean value={true} english="Wings" />
      </ConfigiaGroup>
      <ConfigiaGroup english="Bird">
        <ConfigiaInput value={"Cruz"} english="Name" />
        <ConfigiaBoolean value={true} english="Wings" />
      </ConfigiaGroup>
      <ConfigiaGroup english="Bird">
        <ConfigiaInput value={"Cruz"} english="Name" />
        <ConfigiaBoolean value={true} english="Wings" />
      </ConfigiaGroup>
      <ConfigiaGroup english="Bird">
        <ConfigiaInput value={"Cruz"} english="Name" />
        <ConfigiaBoolean value={true} english="Wings" />
      </ConfigiaGroup>
      <ConfigiaGroup english="Bird">
        <ConfigiaInput value={"Cruz"} english="Name" />
        <ConfigiaBoolean value={true} english="Wings" />
      </ConfigiaGroup>
      <ConfigiaGroup english="Bird">
        <ConfigiaInput value={"Cruz"} english="Name" />
        <ConfigiaBoolean value={true} english="Wings" />
      </ConfigiaGroup>
    </ConfigiaPane>
  );
};
