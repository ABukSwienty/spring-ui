import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useCallback, useState } from "react";

import { Button, MultiComboBox } from "../../../library";
import { wands } from "../../data/wands";

export default {
  component: MultiComboBox,
} as ComponentMeta<typeof MultiComboBox>;

const Template: ComponentStory<typeof MultiComboBox> = (args) => {
  const [selected, setSelected] = useState<string[]>(["Ash", "Hawthorn wood"]);

  const onChange = useCallback((value: string[], name: string) => {
    setSelected(value);
  }, []);

  return (
    <div className="w-full md:w-1/3">
      <MultiComboBox
        {...args}
        options={wands}
        value={selected}
        onChange={onChange}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  name: "wands",
  color: "brand",
  label: "Choose all the wands",
  placement: "bottom",
  offset: 10,
  isFilterable: true,
};

export const CustomBadges = Template.bind({});

CustomBadges.args = {
  ...Default.args,
  customBadges: (option, handleDeselect) => (
    <div className="mt-1 flex w-full flex-row items-center justify-between border-b-2 py-1 pb-1 first:mt-0 last-of-type:border-b-0">
      <div>
        <p>{option.label}</p>
        <p className="text-xs text-gray-300">{option.detail}</p>
      </div>
      <Button onClick={handleDeselect} size="xs" color="light">
        remove
      </Button>
    </div>
  ),
};
