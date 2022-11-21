import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PasswordInput } from "../../../library";

export default {
  component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PasswordInput> = (args) => (
  <div className="w-1/3">
    <PasswordInput {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  name: "password",
  label: "Password",
  placeholder: "Enter your password",
  color: "brand",
  helperText:
    "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
};

export const ValidateOnInput = Template.bind({});

ValidateOnInput.args = {
  ...Default.args,
  validateOnInput: true,
};

export const CustomValidateOnInput = Template.bind({});

CustomValidateOnInput.args = {
  ...Default.args,
  helperText: "Password must contain at least 8 characters",
  validateOnInput: true,
  validator: (value) => value.length >= 8,
};
