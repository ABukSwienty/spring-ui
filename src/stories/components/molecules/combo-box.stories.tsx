import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useCallback, useState } from "react";

import { Button, ComboBox } from "../../../library";
import { wands } from "../../data/wands";

export default {
  component: ComboBox,
} as ComponentMeta<typeof ComboBox>;

const Template: ComponentStory<typeof ComboBox> = (args) => {
  const [selected, setSelected] = useState<string | undefined>();

  const onChange = useCallback((value: string | undefined, name: string) => {
    setSelected(value);
  }, []);

  const handleDynamicallySet = useCallback(() => {
    setSelected(wands[Math.round(Math.random() * wands.length - 1)].value);
  }, []);

  return (
    <div className="space-y-8">
      <Button onClick={handleDynamicallySet}>Dynamically set</Button>
      <div className="w-full md:w-1/3">
        <ComboBox
          {...args}
          options={wands}
          value={selected}
          onChange={onChange}
        />
      </div>
      <p>You selected: {selected}</p>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  name: "wands",
  color: "brand",
  placement: "bottom",
  offset: 10,
  isFilterable: true,
  selectMode: "select",
};

export const NotFilterable = Template.bind({});

NotFilterable.args = {
  ...Default.args,
  isFilterable: false,
};

export const SelectDeselectMode = Template.bind({});

SelectDeselectMode.args = {
  ...Default.args,
  isFilterable: false,
  selectMode: "select-deselect",
};

export const CustomOptions = Template.bind({});

CustomOptions.args = {
  ...Default.args,
  customOptions: (option) => (
    <div className="flex flex-col">
      <p>{option.label}</p>
      <p className="text-xs text-gray-500">{option.detail}</p>
    </div>
  ),
};

export const CustomFilter = Template.bind({});

CustomFilter.args = {
  ...CustomOptions.args,
  customFilter: (options, value) =>
    options.filter((option) =>
      option.detail.toLowerCase().includes(value.toLowerCase())
    ),
};

export const CustomNoResults = Template.bind({});

CustomNoResults.args = {
  ...CustomOptions.args,
  customNoResults: (value, handleClose) => (
    <div className="flex flex-col space-y-3 p-2 text-sm">
      <p>No results for '{value}'</p>
      <div className="flex flex-row space-x-3">
        <Button size="sm" color="light" onClick={handleClose}>
          Close
        </Button>
        <Button size="sm">Add</Button>
      </div>
    </div>
  ),
};
