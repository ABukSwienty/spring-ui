import {
  floatingOptionColors,
  FloatingInputItem,
} from "../floating/floating-input-item";

const DefaultNoResults = ({
  color,
  value,
}: {
  color: keyof typeof floatingOptionColors | undefined;
  value: string;
}) => (
  <FloatingInputItem className="text-sm" color={color}>
    No results match <span className="text-medium text-base">'{value}'</span>
  </FloatingInputItem>
);

export default DefaultNoResults;
