import React from "react";
import { Colors } from "../../../types/colors";
import setClasses from "../../../util/set-classes";
import { Button, ButtonProps } from "../button/button";
import { BaseFlexProps, Flex } from "../flex";

export interface ButtonGroupProps extends BaseFlexProps {
  children: React.ReactNode;
}

const Component = ({ className, children, ...props }: ButtonGroupProps) => {
  return (
    <Flex direction="row" align="center" {...props}>
      {children}
    </Flex>
  );
};

const borderColors: Colors = {
  brand: "border-brand-500",
  secondary: "border-brand-200",
  accent: "border-accent-500",
  success: "border-success-500",
  error: "border-error-500",
  warning: "border-warning-500",
  light: "border-gray-200",
  dark: "border-gray-800",
  none: "",
};

const ButtonGroupButton = ({ className, ...props }: ButtonProps) => {
  const classNames = setClasses([
    className,
    "first:rounded-l-md rounded-l-none rounded-r-none last:rounded-r-md focus:z-10 !ring-offset-0 !ring-0 first:border-y first:border-l last:border-y last:border-r border-y border-l",
    borderColors[props.color || "brand"],
  ]);
  return <Button className={classNames} {...props} />;
};

const ButtonGroup = Object.assign(Component, { Button: ButtonGroupButton });

export { ButtonGroup };
