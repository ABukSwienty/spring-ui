import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Slider as SliderComponent } from "../../../library";

export default {
  component: SliderComponent,
} as ComponentMeta<typeof SliderComponent>;

const example = [
  "slide 1",
  "slide 2",
  "slide 3",
  "slide 4",
  "slide 5",
  "slide 6",
];

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof SliderComponent> = (args) => {
  return (
    <div className="w-screen">
      <div className="w-full border md:w-1/2">
        <SliderComponent {...args}>
          {example.map((item, i) => (
            <div
              key={i}
              className="flex h-96 w-full items-center justify-center rounded-xl border bg-gray-100 text-sm font-semibold shadow-md"
            >
              {item}
            </div>
          ))}
        </SliderComponent>
      </div>
    </div>
  );
};

export const Slider = Template.bind({});

Slider.args = {
  slideSize: 75,
  swipeConfidenceThreshold: 10000,
};
