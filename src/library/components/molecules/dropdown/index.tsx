import {
  useFloating,
  offset,
  flip,
  shift,
  Placement,
} from "@floating-ui/react-dom";
import React, { useRef } from "react";
import { useCallback, useState } from "react";
import cancelableDebounce from "../../../util/cancelable-debounce";
import { DropdownButton } from "./button";
import { DropdownFlex } from "./flex";
import { DropdownIcon } from "./icon";
import { DropdownMenuItem } from "./item";

export type OpenMode = "click" | "hover";

export const useDropdown = ({
  offset: offsetProp,
  placement,
  openMode,
}: {
  offset: number;
  openMode: OpenMode;
  placement: Placement;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, reference, floating, strategy, refs } = useFloating({
    strategy: "absolute",
    placement,
    middleware: [offset(offsetProp), flip(), shift()],
  });

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const hoverDebouncer = useRef(cancelableDebounce(handleClose, 300));

  const handleHoverOpen = useCallback(() => {
    hoverDebouncer.current.cancel();
    setIsOpen(true);
  }, []);

  const handleHoverClose = useCallback(() => {
    hoverDebouncer.current.debouncer();
  }, []);

  const clickStrategy = useRef(
    openMode === "click" ? { onClick: handleToggle } : {}
  );

  const hoverStrategy = useRef(
    openMode === "click"
      ? {}
      : {
          onMouseEnter: handleHoverOpen,
          onMouseLeave: handleHoverClose,
        }
  );

  return {
    x,
    y,
    reference,
    floating,
    strategy,
    refs,
    isOpen,
    handleOpen,
    handleClose,
    handleToggle,
    clickStrategy,
    hoverStrategy,
  };
};

export interface DropdownProps {
  children: React.ReactNode;
  dropdownPlacement?: Placement;
  offset?: number;
  openMode?: OpenMode;
  minWidth?: React.CSSProperties["minWidth"];
  maxWidth?: React.CSSProperties["maxWidth"];
  dismissOnClick?: boolean;
}

type DropdownContextInterface = ReturnType<typeof useDropdown> & {
  minWidth?: React.CSSProperties["minWidth"];
  maxWidth?: React.CSSProperties["maxWidth"];
  dismissOnClick?: boolean;
};

export const DropdownContext = React.createContext<DropdownContextInterface>(
  undefined!
);

export const DropDownProvider = ({
  dropdownPlacement: placement = "bottom-start",
  offset = 7,
  openMode = "click",
  children,
  minWidth = "100%",
  maxWidth = "auto",
  dismissOnClick = true,
}: DropdownProps) => {
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    refs,
    isOpen,
    handleOpen,
    handleClose,
    handleToggle,
    clickStrategy,
    hoverStrategy,
  } = useDropdown({
    offset,
    placement,
    openMode,
  });

  return (
    <DropdownContext.Provider
      value={{
        x,
        y,
        reference,
        floating,
        strategy,
        refs,
        isOpen,
        handleOpen,
        handleClose,
        handleToggle,
        clickStrategy,
        hoverStrategy,
        minWidth,
        maxWidth,
        dismissOnClick,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

const Component = {};

export const Dropdown = Object.assign(Component, {
  Button: DropdownButton,
  Icon: DropdownIcon,
  Flex: DropdownFlex,
  Item: DropdownMenuItem,
});
