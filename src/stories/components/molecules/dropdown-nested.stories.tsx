import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from "../../../library";

export default {
  component: Dropdown.Button,
  title: "stories/components/molecules/Dropdown nested",
} as ComponentMeta<typeof Dropdown.Button>;

const Template: ComponentStory<typeof Dropdown.Button> = (args) => (
  <div>
    <div className="w-fit">
      <Dropdown.Button {...args}>
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
        <Dropdown.Item>
          <Dropdown.Flex
            direction="row"
            justify="between"
            align="center"
            flexChildren={
              <>
                <p>more options</p>
                <ChevronRightIcon className="h-4 w-4" />
              </>
            }
            openMode="hover"
            dropdownPlacement="right-start"
            offset={0}
            dismissOnClick={false}
            minWidth="256px"
            maxWidth="256px"
          >
            <Dropdown.Item>Item 1.1</Dropdown.Item>
            <Dropdown.Item>Item 1.2</Dropdown.Item>
            <Dropdown.Item>Item 1.3</Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Flex
                direction="row"
                justify="between"
                align="center"
                flexChildren={
                  <>
                    <p>more options</p>
                    <ChevronRightIcon className="h-4 w-4" />
                  </>
                }
                openMode="hover"
                dropdownPlacement="right-start"
                offset={0}
                dismissOnClick={false}
                minWidth="256px"
                maxWidth="256px"
              >
                <Dropdown.Item>Item 1.1</Dropdown.Item>
                <Dropdown.Item>Item 1.2</Dropdown.Item>
                <Dropdown.Item>Item 1.3</Dropdown.Item>
              </Dropdown.Flex>
            </Dropdown.Item>
          </Dropdown.Flex>
        </Dropdown.Item>
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
  dismissOnClick: false,
};

export const HoverMode = Template.bind({});

HoverMode.args = {
  ...Default.args,
  openMode: "hover",
};
