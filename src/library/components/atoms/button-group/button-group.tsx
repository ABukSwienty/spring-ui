import React from "react";
import setClasses from "../../../util/set-classes";
import { Button, ButtonProps } from "../button/button";

export interface ButtonGroupProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

const ButtonGroup = ({ className, children, ...props }: ButtonGroupProps) => {
  return (
    <div className="flex flex-row items-center" {...props}>
      {children}
    </div>
  );
};

ButtonGroup.Button = ({ className, ...props }: ButtonProps) => {
  const classNames = setClasses([
    className,
    "first:rounded-l-md rounded-l-none rounded-r-none last:rounded-r-md focus:z-10",
  ]);
  return <Button className={classNames} {...props} />;
};

export { ButtonGroup };
