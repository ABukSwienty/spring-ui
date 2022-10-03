import { BeakerIcon } from "@heroicons/react/24/outline";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "../../../library";

export default {
  component: Button,
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: "Button",
  size: "md",
  trailingIcon: BeakerIcon,
};
