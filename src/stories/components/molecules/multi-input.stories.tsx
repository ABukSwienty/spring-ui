import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useCallback, useState } from "react";

import { Button, MultiInput } from "../../../library";

export default {
  component: MultiInput,
} as ComponentMeta<typeof MultiInput>;

const Template: ComponentStory<typeof MultiInput> = (args) => {
  const [state, setState] = useState<string[]>([]);

  const handleChange = useCallback(
    (value: string[], name: string) => setState(value),
    []
  );

  return (
    <div className="w-1/3">
      <MultiInput {...args} value={state} onChange={handleChange} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  color: "brand",
  name: "test",
  label: "Add multiple values",
  dispatchKeys: ["Enter", "Tab"],
  placeholder: "Press ⏎ or ⇥ to add",
  pill: false,
  undoable: false,
};

export const Pill = Template.bind({});

Pill.args = {
  ...Default.args,
  pill: true,
};

export const Error = Template.bind({});

Error.args = {
  ...Default.args,
  error: "This field is required",
};

export const Undoable = Template.bind({});

Undoable.args = {
  ...Default.args,
  undoable: true,
};

export const CustomValidator = Template.bind({});

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

CustomValidator.args = {
  ...Default.args,
  helperText: "Enter a valid email address",
  customValidator: (value) => {
    return value.match(emailRegex) ? undefined : "Invalid email address";
  },
};

export const CustomBadges = Template.bind({});

CustomBadges.args = {
  ...Default.args,
  customBadges: (option, handleDeselect) => (
    <div className="mt-1 flex w-full flex-row items-center justify-between border-b-2 py-1 pb-1 first:mt-0 last-of-type:border-b-0">
      <div>
        <p>{option.value}</p>
      </div>
      <Button onClick={handleDeselect} size="xs" color="light">
        remove
      </Button>
    </div>
  ),
};
