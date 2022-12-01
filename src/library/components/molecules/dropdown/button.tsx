import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { DropdownContext, DropdownProps, DropDownProvider } from ".";
import { Button, ButtonProps } from "../../atoms/button/button";
import { DropDownMenu } from "./menu";

export interface DropdownButtonProps
  extends Omit<
    ButtonProps,
    "trailingIcon" | "leadingIcon" | "onClick" | "onMouseLeave" | "onMouseEnter"
  > {
  label: string;
  isIconTrailing?: boolean;
}

const Component = ({
  children,
  label,
  isIconTrailing = true,
  ...rest
}: DropdownButtonProps) => {
  const { reference, clickStrategy, hoverStrategy, isOpen } =
    useContext(DropdownContext);

  const Icon = isOpen ? ChevronUpIcon : ChevronDownIcon;

  const iconProps = isIconTrailing
    ? {
        trailingIcon: Icon,
      }
    : {
        leadingIcon: Icon,
      };

  return (
    <div ref={reference} {...hoverStrategy.current} className="h-fit w-fit">
      <Button {...rest} {...iconProps} {...clickStrategy.current}>
        {label}
      </Button>
      <AnimatePresence>
        {isOpen && <DropDownMenu>{children}</DropDownMenu>}
      </AnimatePresence>
    </div>
  );
};

export const DropdownButton = ({
  offset,
  dropdownPlacement,
  openMode,
  minWidth,
  maxWidth,
  dismissOnClick,
  ...rest
}: DropdownProps & DropdownButtonProps) => {
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
