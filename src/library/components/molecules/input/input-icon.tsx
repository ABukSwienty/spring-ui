import React from "react";
import { FC } from "react";
import { SpringColors } from "../../../types/spring-colors";
import setClasses from "../../../util/set-classes";

export interface InputIconProps {
  icon: FC<React.ComponentProps<"svg">>;
  color: keyof typeof inputIconColor;
  className: string;
  isError?: boolean;
}

const inputIconColor: SpringColors = {
  brand: "group-focus-within:text-brand-700",
  secondary: "group-focus-within:text-brand-400",
  accent: "group-focus-within:text-accent-700",
  success: "group-focus-within:text-success-500",
  error: "group-focus-within:text-error-500",
  warning: "group-focus-within:text-warning-500",
  light: "group-focus-within:text-gray-400",
  dark: "group-focus-within:text-gray-800",
  none: "",
};

export const InputIcon = React.forwardRef<HTMLDivElement, InputIconProps>(
  ({ isError, color, className, icon: Icon }, ref) => {
    const classNames = setClasses([
      "pointer-events-none h-full w-5 transition-colors duration-150 ease-in-out flex items-center",
      !isError && inputIconColor[color],
      isError ? "text-error-500" : "text-gray-600",
    ]);

    const containerClassNames = setClasses(["absolute inset-y-0", className]);

    return (
      <div ref={ref} className={containerClassNames}>
        <Icon className={classNames} />
      </div>
    );
  }
);
