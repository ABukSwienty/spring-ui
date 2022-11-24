import {
  CalendarDaysIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button, TimeLine } from "../../../library";

export default {
  component: TimeLine,
} as ComponentMeta<typeof TimeLine>;

const Template: ComponentStory<typeof TimeLine> = (args) => (
  <TimeLine>
    <TimeLine.Item>
      <TimeLine.Header
        heading="This is a default timeline item"
        time={`Released ${new Date().toDateString()}`}
      />
      <TimeLine.Body>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
          officiis, necessitatibus voluptates, minus mollitia earum provident
          error a, laborum eos sequi. Quas facere nisi suscipit animi eligendi,
          similique quam eum.
        </p>
      </TimeLine.Body>
    </TimeLine.Item>
    <TimeLine.Item>
      <TimeLine.Header
        heading="This is a timeline with a custom point..."
        time={`Released ${new Date().toDateString()}`}
        point={CalendarDaysIcon}
      />
      <TimeLine.Body>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
          officiis, necessitatibus voluptates, minus mollitia earum provident
          error a, laborum eos sequi. Quas facere nisi suscipit animi eligendi,
          similique quam eum.
        </p>
      </TimeLine.Body>
    </TimeLine.Item>
    <TimeLine.Item>
      <TimeLine.Header
        heading="...and it can be small and a different color..."
        point={CalendarDaysIcon}
        time="a few days ago"
        color="error"
        size="sm"
        justify="between"
      >
        <a href="#" className="text-sm underline underline-offset-1">
          read more
        </a>
      </TimeLine.Header>
    </TimeLine.Item>
    <TimeLine.Item>
      <TimeLine.Header
        heading="...or more elaborate"
        point={CalendarDaysIcon}
        time="a few weeks ago"
        color="success"
        justify="between"
      >
        <Button size="sm" color="light" trailingIcon={ArrowRightCircleIcon}>
          See results
        </Button>
      </TimeLine.Header>
      <TimeLine.Body className="space-y-2">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
          officiis, necessitatibus voluptates.
        </p>
        <div className="space-x-4">
          <Button size="xs" color="light">
            Edit
          </Button>
          <Button size="xs" color="error">
            Delete
          </Button>
        </div>
      </TimeLine.Body>
    </TimeLine.Item>
  </TimeLine>
);

export const Default = Template.bind({});

Default.args = {};
