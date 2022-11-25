import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Checkbox } from "../../../library";

export default {
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <div className="w-1/3">
    <Checkbox {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  id: "checkbox",
  color: "brand",
  label: "Checkbox",
  icon: "check",
  size: "md",
};

export const Flex = Template.bind({});

Flex.args = {
  ...Default.args,
  justify: "between",
};

export const Dynamic = Template.bind({});

Dynamic.args = {
  ...Default.args,
  justify: "between",
};
