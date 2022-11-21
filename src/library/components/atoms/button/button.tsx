import { motion } from "framer-motion";
import { FC } from "react";
import framerVariantProps from "../../../constants/framer-variant-props";
import { FramerVariants } from "../../../types/framer-variants";
import { OmitFramerProps } from "../../../types/omit-framer-props";
import { SpringColors } from "../../../types/spring-colors";
import { SpringSizes } from "../../../types/spring-sizes";
import setClasses from "../../../util/set-classes";
import setVariants from "../../../util/set-variants";
import { Spinner } from "../spinner";

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, OmitFramerProps> {
  children: React.ReactNode;
  className?: string;
  color?: keyof typeof buttonColors;
  size?: keyof typeof buttonSizes;
  isLoading?: boolean;
  leadingIcon?: FC<React.ComponentProps<"svg">>;
  trailingIcon?: FC<React.ComponentProps<"svg">>;
}

export const buttonSizes: SpringSizes = {
  xs: "px-2 py-1 text-xs rounded-md",
  sm: "text-sm px-2 py-1 rounded-md",
  md: "text-sm px-3 py-1.5 rounded-lg",
  lg: "text-base px-5 py-2 rounded-lg",
  xl: "text-lg px-6 py-3 rounded-lg",
};

export const iconSizes: SpringSizes = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};

export const buttonColors: SpringColors = {
  brand:
    "bg-brand-700 text-white hover:bg-brand-600 ring-1 ring-brand-600 focus:ring-2 focus:ring-offset-2",
  secondary:
    "text-brand-700 hover:bg-brand-50 ring-1 ring-brand-600 focus:ring-2 focus:ring-offset-2",
  accent:
    "bg-accent-700 text-white hover:bg-accent-600 ring-1 ring-accent-600 focus:ring-2 focus:ring-offset-2",
  success:
    "bg-success-700 text-white hover:bg-success-600 ring-1 ring-success-600 focus:ring-2 focus:ring-offset-2",
  error:
    "bg-error-700 text-white hover:bg-error-600 ring-1 ring-error-600 focus:ring-2 focus:ring-offset-2",
  warning:
    "bg-warning-700 text-white hover:bg-warning-600 ring-1 ring-warning-600 focus:ring-2 focus:ring-offset-2",
  light:
    "bg-gray-50 text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200 focus:ring-2 focus:ring-accent-600 focus:ring-offset-2",
  dark: "bg-gray-800 text-white hover:bg-gray-700 ring-1 ring-gray-600 focus:ring-2 focus:ring-offset-2",
  none: "",
};

export const BUTTON_VARIANTS: Partial<FramerVariants> = {
  tap: {
    scale: 0.95,
  },
};

export const Button = ({
  size = "md",
  color = "brand",
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  children,
  className,
  isLoading = false,
  ...props
}: ButtonProps) => {
  const buttonVariants = setVariants([BUTTON_VARIANTS]);
  const classNames = setClasses([
    "transition-shadow duration-100 ease-out outline-none relative",
    (LeadingIcon || TrailingIcon) && "flex items-center justify-center",
    buttonSizes[size],
    buttonColors[color],
    className,
  ]);
  const iconClassNames = setClasses([
    iconSizes[size],
    TrailingIcon ? "ml-3" : "mr-3",
  ]);
  return (
    <motion.button
      variants={buttonVariants}
      {...framerVariantProps}
      className={classNames}
      {...props}
    >
      {LeadingIcon && (
        <div className={iconClassNames}>
          <LeadingIcon />
        </div>
      )}
      {children}
      {TrailingIcon && !isLoading && (
        <div className={iconClassNames}>
          <TrailingIcon />
        </div>
      )}

      {isLoading && (
        <div className="ml-3">
          <Spinner color={color === "light" ? "accent" : "light"} />
        </div>
      )}
    </motion.button>
  );
};
