import { BeakerIcon } from "@heroicons/react/24/outline";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Badge } from "../../../library";

export default {
  component: Badge,
} as ComponentMeta<typeof Badge>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: "badge",
  color: "brand",
  size: "xs",
  trailingIcon: BeakerIcon,
};
