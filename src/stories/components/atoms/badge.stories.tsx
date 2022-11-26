import { BeakerIcon } from "@heroicons/react/24/outline";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Badge } from "../../../library";

export default {
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "badge",
  color: "brand",
  size: "xs",
  trailingIcon: BeakerIcon,
};

export const Pill = Template.bind({});

Pill.args = {
  ...Default.args,
  pill: true,
};
