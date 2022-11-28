import { Placement } from "@floating-ui/react-dom-interactions";
import { motion } from "framer-motion";
import { FC } from "react";
import framerVariantProps from "../../../constants/framer-variant-props";
import { FramerVariants } from "../../../types/framer-variants";
import { OmitFramerProps } from "../../../types/omit-framer-props";
import { Sizes } from "../../../types/sizes";
import setClasses from "../../../util/set-classes";
import setVariants from "../../../util/set-variants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../molecules/tooltip";
import { buttonColors, BUTTON_VARIANTS } from "../button/button";

export interface IconButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, OmitFramerProps> {
  tooltip?: string;
  icon: FC<React.ComponentProps<"svg">>;
  size?: keyof typeof iconButtonSizes;
  color?: keyof typeof buttonColors;
  animations?: Partial<FramerVariants>;
  tooltipPlacement?: Placement;
  rounded?: boolean;
  showTooltip?: boolean;
}

const iconButtonSizes: Sizes = {
  xs: "p-0.5",
  sm: "p-1",
  md: "p-1.5",
  lg: "p-2.5",
  xl: "p-4",
};

const iconSizes: Sizes = {
  xs: "w-3 h-3",
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

export const IconButton = ({
  tooltip,
  icon: Icon,
  className,
  size = "md",
  color = "brand",
  animations,
  tooltipPlacement = "bottom",
  rounded = false,
  showTooltip = true,
  ...rest
}: IconButtonProps) => {
  const buttonVariants = setVariants([BUTTON_VARIANTS, animations]);
  const classNames = setClasses([
    buttonColors[color],
    iconButtonSizes[size],
    className,
    "transition-shadow duration-100 ease-out outline-none relative flex items-center justify-center",
    rounded ? "rounded-full" : "rounded-md",
  ]);

  if (tooltip && showTooltip)
    return (
      <Tooltip placement={tooltipPlacement}>
        <TooltipTrigger>
          <motion.button
            variants={buttonVariants}
            {...framerVariantProps}
            aria-label={tooltip}
            className={classNames}
            {...rest}
          >
            <Icon className={`${iconSizes[size]}`} />
          </motion.button>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    );

  return (
    <motion.button
      variants={buttonVariants}
      {...framerVariantProps}
      aria-label={tooltip}
      className={classNames}
      {...rest}
    >
      <Icon className={`${iconSizes[size]}`} />
    </motion.button>
  );
};
