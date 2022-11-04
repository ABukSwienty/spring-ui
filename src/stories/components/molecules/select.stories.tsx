import { BeakerIcon } from "@heroicons/react/24/outline";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

import { Select } from "../../../library";
import { wands } from "../../data/wands";

export default {
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = ({
  value: valueProps,
  ...args
}) => {
  const [value, setValue] = useState<undefined | number | string>(valueProps);
  return (
    <div className="w-full md:w-1/3">
      <Select
        {...args}
        value={value}
        onChange={(value, name) => {
          // @ts-ignore
          setValue(value);
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  label: "Select a wand",
  placeholder: "The wand chooses the wizard",
  color: "brand",
  isClearable: false,
  useClickOutside: true,
  selectCloseDelay: 25,
  closeOnSelect: true,
  placement: "bottom",
  offset: 10,
  leadingAddOn: "🪄",
  options: wands,
};

export const DisabledItems = Template.bind({});

DisabledItems.args = {
  ...Default.args,
  options: wands.map((wand, i) => {
    if (i % 2 === 0) {
      return {
        ...wand,
        disabled: true,
      };
    }
    return wand;
  }),
};

export const Clearable = Template.bind({});

Clearable.args = {
  ...Default.args,
  isClearable: true,
};

export const Preselected = Template.bind({});

Preselected.args = {
  ...Default.args,
  value: "Ash",
};

export const CustomItems = Template.bind({});

CustomItems.args = {
  ...Default.args,
  renderItems: (item, isSelected) => (
    <div className="flex h-full w-full flex-wrap items-center gap-4 py-2">
      <div>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100">
          🪄
        </span>
      </div>
      <span
        className={`font-base ${isSelected ? "text-white" : "text-gray-600"}`}
      >
        {item.value}
      </span>{" "}
      <span
        className={`text-sm ${
          isSelected ? "text-white" : "text-gray-400"
        } font-light`}
      >
        {item.detail}
      </span>
    </div>
  ),
};
