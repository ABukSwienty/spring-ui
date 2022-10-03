import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Spinner } from "../../../library";

export default {
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  size: "md",
};
