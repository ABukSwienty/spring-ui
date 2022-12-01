import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import framerVariantProps from "../../../constants/framer-variant-props";
import { SWING_VARIANTS } from "../../../constants/swing-variants";

import { OmitFramerProps } from "../../../types/omit-framer-props";
import setClasses from "../../../util/set-classes";

export interface FloatingInputDropdownProps
  extends Omit<React.ComponentPropsWithRef<"ul">, OmitFramerProps> {
  isOpen: boolean;
  width?: React.CSSProperties["width"];
  top?: number;
  left?: number;
  position?: React.CSSProperties["position"];
}

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
            variants={SWING_VARIANTS}
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
