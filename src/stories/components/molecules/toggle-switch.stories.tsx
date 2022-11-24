import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useCallback, useState } from "react";

import { ToggleSwitch } from "../../../library";

export default {
  component: ToggleSwitch,
} as ComponentMeta<typeof ToggleSwitch>;

const Template: ComponentStory<typeof ToggleSwitch> = (args) => {
  const [value, setValue] = useState(args.value);

  const handleChange = useCallback(
    (name: string, value: boolean) => setValue(value),
    []
  );

  return (
    <div>
      <ToggleSwitch {...args} value={value} onChange={handleChange} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  name: "toggle",
  label: "Toggle switch",
  size: "md",
  color: "brand",
  disabled: false,
  value: false,
};

export const Disabled = Template.bind({});

Disabled.args = {
  ...Default.args,
  disabled: true,
  value: true,
};
