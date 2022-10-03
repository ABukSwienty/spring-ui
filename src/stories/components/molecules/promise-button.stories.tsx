import { BeakerIcon } from "@heroicons/react/24/outline";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PromiseButton } from "../../../library";

export default {
  component: PromiseButton,
} as ComponentMeta<typeof PromiseButton>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PromiseButton> = (args) => (
  <PromiseButton {...args} />
);

export const Success = Template.bind({});

Success.args = {
  children: "Send email",
  size: "md",
  trailingIcon: BeakerIcon,
  onClick: () => new Promise((resolve) => setTimeout(resolve, 2000)),
};

export const Error = Template.bind({});

Error.args = {
  children: "Send email",
  size: "md",
  trailingIcon: BeakerIcon,
  onClick: () => new Promise((resolve, reject) => setTimeout(reject, 2000)),
};
