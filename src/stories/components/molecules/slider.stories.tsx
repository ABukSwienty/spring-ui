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

export const Normal = Template.bind({});

Normal.args = {
  offsetBy: 0,
  extendSlides: 1,
  swipeConfidenceThreshold: 10000,
  slideSize: 75,
  mode: "normal",
};

export const SnapToCenterAndInfinite = Template.bind({});

SnapToCenterAndInfinite.args = {
  offsetBy: example.length,
  extendSlides: 2,
  swipeConfidenceThreshold: 10000,
  slideSize: 75,
  mode: "snapToCenterAndInfinite",
};

export const SnapToCenter = Template.bind({});

SnapToCenter.args = {
  offsetBy: 0,
  extendSlides: 1,
  swipeConfidenceThreshold: 10000,
  slideSize: 75,
  mode: "snapToCenter",
};
