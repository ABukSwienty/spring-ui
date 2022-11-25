import { BeakerIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from "../../../library";

export default {
  component: Dropdown.Flex,
  title: "stories/components/molecules/Dropdown as flex",
} as ComponentMeta<typeof Dropdown.Flex>;

const Template: ComponentStory<typeof Dropdown.Flex> = (args) => (
  <div>
    <div className="ml-auto w-fit">
      <Dropdown.Flex {...args}>
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
      </Dropdown.Flex>
    </div>
  </div>
);

export const Default = Template.bind({});

Default.args = {
  minWidth: "256px",
  openMode: "click",
  dropdownPlacement: "bottom",
  flexChildren: <div>Hey there!</div>,
};

export const HoverMode = Template.bind({});

HoverMode.args = {
  ...Default.args,
  openMode: "hover",
};
