import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from "../../../library";

export default {
  component: Dropdown.Button,
  title: "stories/components/molecules/Dropdown as button",
} as ComponentMeta<typeof Dropdown.Button>;

const Template: ComponentStory<typeof Dropdown.Button> = (args) => (
  <div>
    <div className="ml-auto w-fit">
      <Dropdown.Button {...args}>
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
      </Dropdown.Button>
    </div>
  </div>
);

export const Default = Template.bind({});

Default.args = {
  label: "Dropdown",
  minWidth: "256px",
  isIconTrailing: true,
  openMode: "click",
};

export const HoverMode = Template.bind({});

HoverMode.args = {
  ...Default.args,
  openMode: "hover",
};

export const LeadingIcon = Template.bind({});

LeadingIcon.args = {
  ...Default.args,
  isIconTrailing: false,
};
