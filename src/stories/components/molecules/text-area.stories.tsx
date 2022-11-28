import { BeakerIcon } from "@heroicons/react/24/outline";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button, TextArea } from "../../../library";

export default {
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: "Enter your message",
  name: "message",
  placeholder: "Enter your message",
};

export const NoResize = Template.bind({});

NoResize.args = {
  ...Default.args,
  resize: "none",
};

export const CornerHint = Template.bind({});

CornerHint.args = {
  ...Default.args,
  cornerHint: "Max 500 characters",
};

export const CornerTip = Template.bind({});

CornerTip.args = {
  ...Default.args,
  cornerTip: "This is a tip",
};

export const CornerElement = Template.bind({});

CornerElement.args = {
  ...Default.args,
  cornerElement: (
    <Button size="xs" color="light" className="mb-1">
      click me!
    </Button>
  ),
};

export const Disabled = Template.bind({});

Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const HelperText = Template.bind({});

HelperText.args = {
  ...Default.args,
  helperText: "This is a helper text",
};

export const Error = Template.bind({});

Error.args = {
  ...Default.args,
  error: "Something went wrong",
};

export const LeadingIcon = Template.bind({});

LeadingIcon.args = {
  ...Default.args,
  leadingIcon: BeakerIcon,
};

export const TrailingIcon = Template.bind({});

TrailingIcon.args = {
  ...Default.args,
  trailingIcon: BeakerIcon,
};

export const TrailingElement = Template.bind({});

TrailingElement.args = {
  ...Default.args,
  resize: "none",
  trailingElement: (
    <div className="mr-3 flex h-full items-center">
      <Button size="xs" color="light" className="mb-1">
        click me!
      </Button>
    </div>
  ),
};
