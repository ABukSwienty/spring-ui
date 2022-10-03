import { BeakerIcon } from "@heroicons/react/24/outline";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ButtonGroup } from "../../../library";

export default {
  component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ButtonGroup> = (args) => (
  <ButtonGroup {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  children: (
    <>
      <ButtonGroup.Button
        color="light"
        leadingIcon={BeakerIcon}
        children="Vaccines approved"
      />
      <ButtonGroup.Button
        color="light"
        children={<span className="font-medium text-gray-600">121k</span>}
      />
    </>
  ),
};
