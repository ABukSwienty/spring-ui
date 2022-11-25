import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { DropdownContext, DropdownProps, DropDownProvider } from ".";
import setClasses from "../../../util/set-classes";
import { BaseFlexProps, Flex } from "../../atoms/flex";
import { DropDownMenu } from "./menu";

export interface DropdownFlexProps
  extends Omit<
    BaseFlexProps,
    "onClick" | "onMouseLeave" | "onMouseEnter" | "showTooltip"
  > {
  flexChildren: React.ReactNode;
}

const Component = ({
  children,
  flexChildren,
  className,
  ...rest
}: DropdownFlexProps) => {
  const { reference, clickStrategy, hoverStrategy, isOpen } =
    useContext(DropdownContext);
  const classNames = setClasses(["w-full h-full", className]);
  console.log(isOpen);
  return (
    <div ref={reference} className="h-full w-full" {...hoverStrategy.current}>
      <Flex {...rest} className={classNames} {...clickStrategy.current}>
        {flexChildren}
      </Flex>

      <AnimatePresence>
        {isOpen && <DropDownMenu>{children}</DropDownMenu>}
      </AnimatePresence>
    </div>
  );
};

export const DropdownFlex = ({
  offset,
  dropdownPlacement,
  openMode,
  minWidth,
  maxWidth,
  dismissOnClick,
  ...rest
}: DropdownProps & DropdownFlexProps) => {
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
