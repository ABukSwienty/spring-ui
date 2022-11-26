import { FC } from "react";
import { SpringColors } from "../../../types/spring-colors";
import { SpringSizes } from "../../../types/spring-sizes";
import setClasses from "../../../util/set-classes";

export interface BadgeProps extends React.ComponentPropsWithoutRef<"div"> {
  color?: keyof typeof badgeColor;
  size?: keyof typeof badgeSize;
  leadingIcon?: FC<React.ComponentProps<"svg">>;
  trailingIcon?: FC<React.ComponentProps<"svg">>;
  pill?: boolean;
}

export const badgeColor: SpringColors = {
  brand: "bg-brand-50 border border-brand-100 text-brand-900",
  secondary: "bg-white border border-brand-600 text-brand-900",
  accent: "bg-accent-50 border border-accent-100 text-accent-900",
  success: "bg-success-50 border border-success-100 text-success-900",
  error: "bg-error-50 border border-error-100 text-error-900",
  warning: "bg-warning-50 border border-warning-100 text-warning-900",
  light: "bg-gray-50 border border-gray-100 text-gray-900",
  dark: "bg-gray-900 border border-gray-800 text-gray-50",
  none: "",
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
  className,
  pill = false,
}: BadgeProps) => {
  const classNames = setClasses([
    "w-fit flex items-center",
    badgeColor[color],
    badgeSize[size],
    className,
    pill ? "rounded-full" : "rounded-md",
  ]);
  return (
    <div className={classNames}>
      {LeadingIcon && <LeadingIcon className="mr-3 h-4 w-4" />}
      {children}
      {TrailingIcon && <TrailingIcon className="ml-3 h-4 w-4" />}
    </div>
  );
};
