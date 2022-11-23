import { BeakerIcon } from "@heroicons/react/24/outline";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  SkeletonButton,
  SkeletonImage,
  SkeletonInput,
  SkeletonParagraph,
  SkeletonTitle,
  SkeletonUser,
} from "../../../library";

export default {
  component: SkeletonButton,
} as ComponentMeta<typeof SkeletonButton>;

const Template: ComponentStory<typeof SkeletonButton> = (args) => (
  <div className="space-y-8 text-sm font-light">
    <div>
      <span>Skeleton button:</span>
      <SkeletonButton />
    </div>
    <div>
      <span>Skeleton input:</span>
      <SkeletonInput />
    </div>
    <div>
      <span>Skeleton paragraph (rows=3):</span>
      <SkeletonParagraph rows={3} />
    </div>
    <div>
      <span>Skeleton title:</span>
      <SkeletonTitle />
    </div>
    <div>
      <span>Skeleton user:</span>
      <div>
        <SkeletonUser size="xs" />
        <SkeletonUser size="sm" />
        <SkeletonUser size="md" />
        <SkeletonUser size="lg" />
        <SkeletonUser size="xl" />
      </div>
    </div>
    <div className="space-y-2">
      <span>Skeleton image sqr:</span>
      <SkeletonImage size="xs" />
      <SkeletonImage size="sm" />
      <SkeletonImage size="md" />
      <SkeletonImage size="lg" />
      <SkeletonImage size="xl" />
    </div>
    <div className="space-y-2">
      <span>Skeleton image rect:</span>
      <SkeletonImage size="xs" mode="rect" />
      <SkeletonImage size="sm" mode="rect" />
      <SkeletonImage size="md" mode="rect" />
      <SkeletonImage size="lg" mode="rect" />
      <SkeletonImage size="xl" mode="rect" />
    </div>
  </div>
);

export const AllTypes = Template.bind({});

AllTypes.args = {};
