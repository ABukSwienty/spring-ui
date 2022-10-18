import { BeakerIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InfoCard } from "../../../library";

export default {
  component: InfoCard,
} as ComponentMeta<typeof InfoCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof InfoCard> = (args) => {
  return (
    <div className="mt-8 w-1/2">
      <InfoCard {...args} />
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas modi, cupiditate hic asperiores voluptatibus sequi doloribus explicabo facilis debitis perferendis, eligendi quam. Sint quis facere temporibus earum explicabo? Voluptatibus.",
  trailingIcon: BeakerIcon,
  color: "brand",
  trailingBadge: "Lorem ipsum dolor",
};
