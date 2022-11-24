import { TimeLineItemBody } from "./body";
import { TimeLineItemHeader } from "./header";
import { TimeLineItem } from "./item";

export interface TimeLineProps {
  children: React.ReactNode;
}

const Component = ({ children }: TimeLineProps) => {
  return <ol className="relative border-l border-gray-200 ">{children}</ol>;
};

const TimeLine = Object.assign(Component, {
  Item: TimeLineItem,
  Header: TimeLineItemHeader,
  Body: TimeLineItemBody,
});

export { TimeLine };
