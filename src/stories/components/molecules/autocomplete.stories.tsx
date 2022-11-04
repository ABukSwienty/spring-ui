import { BeakerIcon } from "@heroicons/react/24/outline";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

import { Autocomplete, Button } from "../../../library";
import { wands } from "../../data/wands";

export default {
  component: Autocomplete,
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = ({
  value: valueProps,
  ...args
}) => {
  const [value, setValue] = useState<undefined | number | string>(valueProps);
  return (
    <div className="flex w-full flex-wrap items-end gap-4">
      <div className="w-full space-y-8 md:w-1/3">
        <Autocomplete
          {...args}
          value={value}
          onChange={(value, name) => {
            // @ts-ignore
            setValue(value);
          }}
        />
      </div>
      {value && <p className="text-sm text-gray-600">{value} chose you!</p>}
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  label: "Select a wand",
  placeholder: "The wand chooses the wizard",
  color: "brand",
  useClickOutside: true,
  selectCloseDelay: 25,
  closeOnSelect: true,
  placement: "bottom",
  offset: 10,
  leadingAddOn: "🪄",
  options: wands,
};

export const CustomItemsAndCustomNoResults = Template.bind({});

CustomItemsAndCustomNoResults.args = {
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
  renderNoResults: (value, handleClose) => (
    <div className="flex h-full w-full flex-wrap items-center gap-4 py-2 px-2 font-light">
      <p className="text-sm">Could not find '{value}'.</p>
      <Button color="light" size="sm" onClick={() => handleClose()}>
        Add it?
      </Button>
    </div>
  ),
};
