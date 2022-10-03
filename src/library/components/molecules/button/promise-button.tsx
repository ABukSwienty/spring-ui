import {
  buttonColors,
  ButtonProps,
  buttonSizes,
  BUTTON_VARIANTS,
  iconSizes,
} from "../../atoms/button/button";
import framerVariantProps from "../../../constants/framer-variant-props";
import setClasses from "../../../utils/set-classes";
import setVariants from "../../../utils/set-variants";
import { Spinner } from "../../atoms/spinner";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FramerVariants } from "../../../types/framer-variants";

export interface PromiseButtonProps
  extends Omit<ButtonProps, "isLoading" | "isLoadingText" | "leadingIcon"> {
  onClick: () => Promise<any>;
}

const SUCCESS_VARIANTS: Partial<FramerVariants> = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      type: "spring",
      duration: 0.3,
      delay: 0.3,
    },
  },
};
const ERROR_VARIANTS: Partial<FramerVariants> = {
  animate: {
    x: [0, -5, 0, 5, 0],
    transition: {
      type: "spring",
      duration: 0.3,
      delay: 0.3,
    },
  },
};

const ICON_VARIANTS: Partial<FramerVariants> = {
  exit: {
    y: 50,
  },
};

const LOADING_VARIANTS: Partial<FramerVariants> = {
  initial: {
    y: -50,
  },
  animate: {
    y: 0,
  },
  exit: {
    y: 50,
  },
};
const SVG_VARIANTS: Partial<FramerVariants> = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
    },
  },
};
const PATH_VARIANTS: Partial<FramerVariants> = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
    transition: {
      type: "spring",
      damping: 20,
    },
  },
};

export const PromiseButton = ({
  onClick,
  size = "md",
  color = "brand",
  className,
  trailingIcon: TrailingIcon,
  children,
  ...props
}: PromiseButtonProps) => {
  const [state, setState] =
    useState<"idle" | "loading" | "success" | "error">("idle");

  const buttonVariants = setVariants([
    BUTTON_VARIANTS,
    state === "success" && SUCCESS_VARIANTS,
    state === "error" && ERROR_VARIANTS,
  ]);
  const iconVariants = setVariants([ICON_VARIANTS]);
  const loadingVariants = setVariants([LOADING_VARIANTS]);
  const svgVariants = setVariants([SVG_VARIANTS]);
  const pathVariants = setVariants([PATH_VARIANTS]);

  const classNames = setClasses([
    "rounded-lg transition-[shadow,color,background-color,border-color,text-decoration-color,fill,stroke] duration-300 ease-in-out overflow-hidden flex items-center justify-center",
    buttonSizes[size],
    (state === "idle" || state === "loading") && buttonColors[color],
    state === "success" && buttonColors.success,
    state === "error" && buttonColors.error,
  ]);

  const iconClassNames = setClasses([iconSizes[size], "ml-3"]);

  const handlePromise = () => {
    setState("loading");
    onClick()
      .then(() => setState("success"))
      .catch(() => setState("error"));
  };

  return (
    <motion.button
      variants={buttonVariants}
      {...framerVariantProps}
      className={classNames}
      {...props}
      onClick={handlePromise}
    >
      {children}
      <AnimatePresence mode="wait">
        {TrailingIcon && state === "idle" && (
          <motion.div
            key="promise_trailing_icon"
            variants={iconVariants}
            {...framerVariantProps}
            className={iconClassNames}
          >
            <TrailingIcon />
          </motion.div>
        )}
        {state === "loading" && (
          <motion.div
            key="promise_loading"
            {...framerVariantProps}
            variants={loadingVariants}
            className="ml-3"
          >
            <Spinner color={color === "light" ? "accent" : "light"} />
          </motion.div>
        )}
        {state === "success" && (
          <motion.svg
            key="promise_success"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={iconClassNames}
            variants={svgVariants}
            {...framerVariantProps}
          >
            <motion.path
              {...framerVariantProps}
              variants={pathVariants}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </motion.svg>
        )}
        {state === "error" && (
          <motion.svg
            key="promise_error"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={iconClassNames}
            variants={svgVariants}
            {...framerVariantProps}
          >
            <motion.path
              {...framerVariantProps}
              variants={pathVariants}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
