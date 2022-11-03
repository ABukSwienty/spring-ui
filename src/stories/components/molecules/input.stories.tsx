import { BeakerIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button, Input as SpringInput, Select } from "../../../library";
import { wands } from "./select.stories";

export default {
  component: SpringInput,
} as ComponentMeta<typeof SpringInput>;

const Template: ComponentStory<typeof SpringInput> = (args) => (
  <div className="w-full md:w-1/2">
    <SpringInput {...args} />
  </div>
);

export const DefaultInput = Template.bind({});

DefaultInput.args = {
  label: "Enter your name",
  name: "input",
  id: "input",
  placeholder: "Harry Potter",
  color: "brand",
};

export const Disabled = Template.bind({});

Disabled.args = {
  ...DefaultInput.args,
  disabled: true,
};

export const HelperText = Template.bind({});

HelperText.args = {
  ...DefaultInput.args,
  helperText: "Not Slytherin, not Slytherin...",
};

export const ErrorInput = Template.bind({});

ErrorInput.args = {
  ...DefaultInput.args,
  error: "Oh no! Gave Dobby a sock!",
};

export const LeadingIcon = Template.bind({});

LeadingIcon.args = {
  ...DefaultInput.args,
  leadingIcon: BeakerIcon,
};

export const trailingIcon = Template.bind({});

trailingIcon.args = {
  ...DefaultInput.args,
  trailingIcon: BeakerIcon,
};

export const LeadingInline = Template.bind({});

LeadingInline.args = {
  ...DefaultInput.args,
  leadingInlineAddOn: "🧙",
};

export const TrailingInline = Template.bind({});

TrailingInline.args = {
  ...DefaultInput.args,
  trailingInlineAddOn: "🧙",
};

export const Leading = Template.bind({});

Leading.args = {
  ...DefaultInput.args,
  leadingAddOn: "🧙🧹🐉",
};

export const Trailing = Template.bind({});

Trailing.args = {
  ...DefaultInput.args,
  trailingAddOn: "🧙🧹🐉",
};

export const TrailingButton = Template.bind({});

TrailingButton.args = {
  ...DefaultInput.args,
  trailingElement: (
    <div className="flex h-full w-full items-center pr-2">
      <Button size="xs">Expelliarmus!</Button>
    </div>
  ),
};

export const TrailingSelect = Template.bind({});

TrailingSelect.args = {
  ...DefaultInput.args,
  label: "Enter your name and select a wand",
  trailingElement: (
    <div className="float-right h-full w-32">
      <Select
        name="wand"
        className="shadow-none ring-0"
        options={wands}
        onChange={() => {}}
      />
    </div>
  ),
};

export const LeadingAndIcon = Template.bind({});

LeadingAndIcon.args = {
  ...DefaultInput.args,
  leadingAddOn: "🧙🧹🐉",
  trailingIcon: BeakerIcon,
};

export const TrailingAndIcon = Template.bind({});

TrailingAndIcon.args = {
  ...DefaultInput.args,
  trailingAddOn: "🧙🧹🐉",
  leadingIcon: BeakerIcon,
};
