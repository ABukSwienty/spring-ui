import { FC } from "react";
import { SpringColors } from "../../../types/spring-colors";
import { SpringSizes } from "../../../types/spring-sizes";
import setClasses from "../../../utils/set-classes";

export interface BadgeProps extends React.ComponentPropsWithoutRef<"div"> {
  color: keyof typeof badgeColor;
  size: keyof typeof badgeSize;
  leadingIcon?: FC<React.ComponentProps<"svg">>;
  trailingIcon?: FC<React.ComponentProps<"svg">>;
}

export const badgeColor: SpringColors = {
  brand: "bg-brand-50 border border-brand-100 text-brand-900",
  secondary: "bg-white border border-brand-200 text-brand-900",
  accent: "bg-accent-50 border border-accent-100 text-accent-900",
  success: "bg-success-50 border border-success-100 text-success-900",
  error: "bg-error-50 border border-error-100 text-error-900",
  warning: "bg-warning-50 border border-warning-100 text-warning-900",
  light: "bg-gray-50 border border-gray-100 text-gray-900",
  dark: "bg-gray-900 border border-gray-800 text-gray-50",
};

export const badgeSize: Pick<SpringSizes, "xs" | "sm" | "md"> = {
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-2 py-1",
  md: "text-sm px-2.5 py-1.5",
};

export const Badge = ({
  children,
  color = "brand",
  size = "xs",
  trailingIcon: TrailingIcon,
  leadingIcon: LeadingIcon,
}: BadgeProps) => {
  const classNames = setClasses([
    "rounded-md w-fit flex items-center",
    badgeColor[color],
    badgeSize[size],
  ]);
  return (
    <div className={classNames}>
      {TrailingIcon && <TrailingIcon className="mr-3 h-4 w-4" />}
      {children}
      {LeadingIcon && <LeadingIcon className="ml-3 h-4 w-4" />}
    </div>
  );
};
