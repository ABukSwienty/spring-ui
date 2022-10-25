import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Flex } from "../../../library";

export default {
  component: Flex,
} as ComponentMeta<typeof Flex>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Flex> = (args) => {
  return (
    <Flex {...args}>
      <Flex
        alignSelf="center"
        className="h-1/3 flex-[0_0_200px] odd:bg-gray-300 even:bg-gray-200"
      >
        item 0 alignSelf="center"
      </Flex>
      <Flex className="h-1/3 grow odd:bg-gray-300 even:bg-gray-200">
        item 1
      </Flex>
      <Flex className="h-1/3 grow odd:bg-gray-300 even:bg-gray-200">
        item 2
      </Flex>
    </Flex>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  className: "border h-64 gap-4 w-full",
  direction: "row",
  justify: "start",
  align: "start",
  as: "div",
};
