import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Checkbox } from "../../../library";

export default {
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  id: "checkbox",
  color: "brand",
  label: "Checkbox",
  icon: "check",
  size: "md",
};
