import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { DropdownContext, DropdownProps, DropDownProvider } from ".";

import { IconButton, IconButtonProps } from "../../atoms/icon-button";
import { DropDownMenu } from "./menu";

export interface DropdownIconProps
  extends Omit<
    IconButtonProps,
    "onClick" | "onMouseLeave" | "onMouseEnter" | "showTooltip"
  > {}

const Component = ({ children, ...rest }: DropdownIconProps) => {
  const { reference, clickStrategy, hoverStrategy, isOpen } =
    useContext(DropdownContext);

  return (
    <div ref={reference} {...hoverStrategy.current} className="h-fit w-fit">
      <IconButton showTooltip={!isOpen} {...rest} {...clickStrategy.current} />

      <AnimatePresence>
        {isOpen && <DropDownMenu>{children}</DropDownMenu>}
      </AnimatePresence>
    </div>
  );
};

export const DropdownIcon = ({
  offset,
  dropdownPlacement,
  openMode,
  minWidth,
  maxWidth,
  dismissOnClick,
  ...rest
}: DropdownProps & DropdownIconProps) => {
  return (
    <DropDownProvider
      minWidth={minWidth}
      maxWidth={maxWidth}
      dropdownPlacement={dropdownPlacement}
      offset={offset}
      openMode={openMode}
      dismissOnClick={dismissOnClick}
    >
      <Component {...rest} />
    </DropDownProvider>
  );
};
