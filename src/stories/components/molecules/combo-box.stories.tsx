import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useCallback, useState } from "react";
import { BeakerIcon } from "@heroicons/react/24/outline";

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

  return (
    <div className="w-1/2 lg:w-1/3">
      <ComboBox
        {...args}
        options={wands}
        value={selected}
        onChange={onChange}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  name: "wands",
  label: "Wands",
  placeholder: "Select a wand",
  color: "brand",
  placement: "bottom",
  offset: 10,
  isFilterable: true,
  selectMode: "select",
};

export const LeadingIcon = Template.bind({});

LeadingIcon.args = {
  ...Default.args,
  leadingIcon: BeakerIcon,
};

export const TrailingIcon = Template.bind({});

TrailingIcon.args = {
  ...Default.args,
  trailingIcon: BeakerIcon,
};

export const LeadingInline = Template.bind({});

LeadingInline.args = {
  ...Default.args,
  leadingInlineAddOn: "🧙",
};

export const TrailingInline = Template.bind({});

TrailingInline.args = {
  ...Default.args,
  trailingInlineAddOn: "🧙",
};

export const Leading = Template.bind({});

Leading.args = {
  ...Default.args,
  leadingAddOn: "🧙",
};

export const Trailing = Template.bind({});

Trailing.args = {
  ...Default.args,
  trailingAddOn: "🧙",
};

export const TrailingButton = Template.bind({});

TrailingButton.args = {
  ...Default.args,
  trailingElement: (
    <div className="flex h-full w-full items-center pr-2">
      <Button color="secondary" size="xs">
        Expelliarmus!
      </Button>
    </div>
  ),
};

export const Error = Template.bind({});

Error.args = {
  ...Default.args,
  error: "Please select a wand",
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
  customOptions: (option, isSelected) => (
    <div className="flex flex-col">
      <p>{option.label}</p>
      <p className={`text-xs ${isSelected ? "text-white" : "text-gray-500"}`}>
        {option.detail}
      </p>
    </div>
  ),
};

export const CustomFilter = Template.bind({});

CustomFilter.args = {
  ...CustomOptions.args,
  customFilter: (options, value) =>
    options.filter(
      (option) =>
        option.detail.toLowerCase().includes(value.toLowerCase()) ||
        option.label.toLowerCase().includes(value.toLowerCase())
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
