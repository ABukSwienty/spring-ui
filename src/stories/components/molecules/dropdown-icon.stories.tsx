import { BeakerIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from "../../../library";

export default {
  component: Dropdown.Icon,
  title: "stories/components/molecules/Dropdown as icon",
} as ComponentMeta<typeof Dropdown.Icon>;

const Template: ComponentStory<typeof Dropdown.Icon> = (args) => (
  <div>
    <div className="ml-auto w-fit">
      <Dropdown.Icon {...args}>
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
      </Dropdown.Icon>
    </div>
  </div>
);

export const Default = Template.bind({});

Default.args = {
  minWidth: "256px",
  openMode: "click",
  icon: BeakerIcon,
  dropdownPlacement: "bottom",
};

export const Tooltip = Template.bind({});

Tooltip.args = {
  ...Default.args,
  tooltip: "Click me!",
  icon: BeakerIcon,
  tooltipPlacement: "left",
};

export const HoverMode = Template.bind({});

HoverMode.args = {
  ...Default.args,
  openMode: "hover",
};
