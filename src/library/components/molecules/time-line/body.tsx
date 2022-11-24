import setClasses from "../../../util/set-classes";

export interface TimeLineItemBodyProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export const TimeLineItemBody = ({
  children,
  className,
  ...rest
}: TimeLineItemBodyProps) => {
  const classNames = setClasses(["mb-4", className]);

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};
