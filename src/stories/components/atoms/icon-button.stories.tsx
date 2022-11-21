import { BeakerIcon } from "@heroicons/react/24/outline";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { IconButton } from "../../../library";

export default {
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Default = Template.bind({});

Default.args = {
  tooltip: "Choose your poison",
  icon: BeakerIcon,
  tooltipPlacement: "bottom",
};

export const WithoutTooltip = Template.bind({});

WithoutTooltip.args = {
  icon: BeakerIcon,
  tooltipPlacement: "bottom",
};
