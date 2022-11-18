import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useCallback, useState } from "react";

import { ComboBox } from "../../../library";
import { wands } from "../../data/wands";

export default {
  component: ComboBox,
} as ComponentMeta<typeof ComboBox>;

const Template: ComponentStory<typeof ComboBox> = (args) => {
  const [selected, setSelected] = useState<string | undefined>();

  const onChange = useCallback((value: string | undefined, name: string) => {
    setSelected(value);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setSelected("Walnut");
        }}
      >
        set wands
      </button>
      <div className="w-full md:w-1/3">
        <ComboBox
          {...args}
          options={wands}
          value={selected}
          onChange={onChange}
        />
      </div>
      <p>{selected}</p>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  name: "wands",
  color: "brand",
  placement: "bottom",
  offset: 10,
};
