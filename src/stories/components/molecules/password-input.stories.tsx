import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useState } from "react";

import { PasswordInput } from "../../../library";

export default {
  component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PasswordInput> = (args) => {
  const [value, setValue] = useState("");
  const [strength, setStrength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setStrength(e.target.value.length / 10);
  };

  return (
    <div className="w-1/3">
      <PasswordInput
        {...args}
        strength={args.strength === 0 ? strength : false}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

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
  strength: false,
};

export const CustomValidateOnInput = Template.bind({});

CustomValidateOnInput.args = {
  ...Default.args,
  helperText: "Password must contain at least 8 characters",
  validateOnInput: true,
  validator: (value) => value.length >= 8,
};

export const StrengthMeter = Template.bind({});

StrengthMeter.args = {
  ...Default.args,
  strength: 0,
};
