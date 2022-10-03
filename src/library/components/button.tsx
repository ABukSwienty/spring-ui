import { motion } from "framer-motion";
import { FC } from "react";
import { FramerVariants } from "../types/framer-variants";
import { OmitFramerProps } from "../types/omit-framer-props";
import { SpringColors } from "../types/spring-colors";
import { SpringSizes } from "../types/spring-sizes";
import classes from "../utils/classes";
import setVariants from "../utils/set-variants";

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, OmitFramerProps> {
  children: React.ReactNode;
  className?: string;
  color?: keyof typeof buttonColors;
  size?: keyof typeof buttonSizes;
  isLoading?: boolean;
  leadingIcon?: FC<React.SVGProps<SVGSVGElement>>;
  trailingIcon?: FC<React.SVGProps<SVGSVGElement>>;
}

const buttonSizes: SpringSizes = {
  xs: "px-2 py-1 text-xs",
  sm: "text-sm px-2 py-1",
  md: "text-base px-3 py-1.5",
  lg: "text-base px-5 py-2",
  xl: "text-lg px-6 py-3",
};

const buttonColors: SpringColors = {
  brand: "bg-brand-700 text-white hover:bg-brand-800",
  secondary: "",
  accent: "",
  success: "",
  error: "",
  warning: "",
  light: "",
  dark: "",
};

const buttonVariants: Partial<FramerVariants> = {
  tap: {
    scale: 0.95,
  },
};

export const Button = ({
  size = "md",
  color = "brand",
  ...props
}: ButtonProps) => {
  const variants = setVariants(buttonVariants);
  const classNames = classes([
    "rounded-lg focus:ring-2 ring-offset-2 transition-colors duration-200 ease-in-out",
    buttonSizes[size],
    buttonColors[color],
  ]);
  return (
    <motion.button
      variants={variants}
      whileTap="tap"
      className={classNames}
      {...props}
    ></motion.button>
  );
};
