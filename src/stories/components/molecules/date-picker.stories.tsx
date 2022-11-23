import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

import { ComboBox, DatePicker } from "../../../library";
import { wands } from "../../data/wands";
import { DefaultInput } from "./input.stories";

export default {
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => {
  const [value, setValue] = useState(new Date());
  return (
    <div className="w-1/2">
      <DatePicker
        {...args}
        onChange={(name, value) => setValue(value)}
        value={value}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  color: "brand",
  label: "Date",
  name: "date",
  placement: "bottom",
};

export const trailingIcon = Template.bind({});

trailingIcon.args = {
  ...Default.args,
  trailingIcon: ChevronUpDownIcon,
};

export const TrailingComboBox = Template.bind({});

TrailingComboBox.args = {
  ...Default.args,
  trailingElement: (
    <div className="float-right h-full w-32">
      <ComboBox
        name="wand"
        className="!shadow-none !ring-0"
        options={wands}
        onChange={() => {}}
        isFilterable={false}
        width="150%"
        placement="bottom-end"
        leadingInlineAddOn="🧹"
      />
    </div>
  ),
};
