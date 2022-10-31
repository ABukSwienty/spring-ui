import { BeakerIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TextInput as SpringTextInput } from "../../../library";

export default {
  component: SpringTextInput,
} as ComponentMeta<typeof SpringTextInput>;

const Template: ComponentStory<typeof SpringTextInput> = (args) => (
  <div className="w-full md:w-1/2">
    <SpringTextInput {...args} />
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
