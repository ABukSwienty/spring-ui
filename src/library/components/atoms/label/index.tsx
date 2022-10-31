import setClasses from "../../../util/set-classes";

export interface LabelProps extends React.ComponentPropsWithoutRef<"label"> {
  children: React.ReactNode;
}

export const Label = ({ children, className, ...props }: LabelProps) => {
  const classNames = setClasses([
    "text-sm font-medium text-gray-600 block",
    className,
  ]);
  return (
    <label className={classNames} {...props}>
      {children}
    </label>
  );
};
