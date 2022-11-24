import setClasses from "../../../util/set-classes";

export interface TimeLineItemProps
  extends React.ComponentPropsWithoutRef<"li"> {}

export const TimeLineItem = ({
  children,
  className,
  ...rest
}: TimeLineItemProps) => {
  const classNames = setClasses([className, "mb-10 ml-6"]);
  return (
    <li className={classNames} {...rest}>
      {children}
    </li>
  );
};
