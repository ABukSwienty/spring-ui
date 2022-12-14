import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { DropdownContext } from ".";
import framerVariantProps from "../../../constants/framer-variant-props";
import { SWING_VARIANTS } from "../../../constants/swing-variants";
import useOnClickOutside from "../../../hooks/use-on-click-outside";

export const DropDownMenu = ({ children }: { children: React.ReactNode }) => {
  const { x, y, floating, strategy, refs, handleClose, minWidth, maxWidth } =
    useContext(DropdownContext);

  useOnClickOutside(
    refs.reference as React.RefObject<HTMLElement>,
    handleClose
  );

  return (
    <FloatingPortal>
      <motion.ul
        variants={SWING_VARIANTS}
        {...framerVariantProps}
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          minWidth,
          maxWidth,
        }}
        className="h-fit max-h-96 min-w-fit origin-[center_-50px] overflow-y-scroll rounded-md border bg-gray-100 shadow-md"
      >
        {children}
      </motion.ul>
    </FloatingPortal>
  );
};
