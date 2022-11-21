import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import framerVariantProps from "../../../constants/framer-variant-props";
import { FramerVariants } from "../../../types/framer-variants";
import { OmitFramerProps } from "../../../types/omit-framer-props";
import setClasses from "../../../util/set-classes";
import setVariants from "../../../util/set-variants";

export interface FloatingInputDropdownProps
  extends Omit<React.ComponentPropsWithRef<"ul">, OmitFramerProps> {
  isOpen: boolean;
  width?: React.CSSProperties["width"];
  top?: number;
  left?: number;
  position?: React.CSSProperties["position"];
}

const VARIANTS: Partial<FramerVariants> = {
  initial: { opacity: 0, rotateX: -20 },
  animate: { opacity: 1, rotateX: 0 },
  exit: { opacity: 0, rotateX: -20, transition: { ease: "anticipate" } },
};

const variants = setVariants([VARIANTS]);

export const FloatingInputDropdown = React.forwardRef<
  HTMLUListElement,
  FloatingInputDropdownProps
>(
  (
    {
      className,
      children,
      isOpen,
      style,
      width = "100%",
      top = 0,
      left = 0,
      position = "absolute",
      ...rest
    },
    ref
  ) => {
    const classNames = setClasses([
      "h-fit max-h-48 overflow-scroll rounded-md border bg-white shadow-md origin-[center_-50px]",
    ]);
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={variants}
            {...framerVariantProps}
            className={classNames}
            {...rest}
            style={{
              ...style,
              top,
              left,
              position,
              width,
            }}
            ref={ref}
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    );
  }
);
