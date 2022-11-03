import { RefObject, useEffect } from "react";
import useKeyboardNavigation from "../use-keyboard-navigation";
import { InternalInputOption } from "./types";

/**
 * Handles the keyboard navigation of the floating input options
 */
export const useFloatingInputOptionsKeyboard = <ValueType>(
  options: React.MutableRefObject<InternalInputOption<ValueType>[]>,
  handleSelect: (id: string) => void,
  element: RefObject<HTMLElement>,
  isOpen: boolean
) => {
  const { cursor, setCursor, isIncrementing } = useKeyboardNavigation({
    maxCursorPos: options.current.length - 1,
    onEnter: (cursor: number) => {
      if (!options) return;
      const selected = options.current[cursor];
      if (!selected) return;
      if (selected.disabled) return;
      handleSelect(selected.id);
    },
    element,
  });
  // scroll into view when cursor changes
  useEffect(() => {
    const current = options.current[cursor];
    if (!current) return;

    const el = document.getElementById(current.id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
    });
  }, [cursor, options]);

  // pretty sure this is a hack
  useEffect(() => {
    const current = options.current[cursor];
    if (!current) return;

    if (!current.disabled) return;

    if (isIncrementing) {
      setCursor((prev) => prev + 1);
    } else {
      setCursor((prev) => prev - 1);
    }
  }, [cursor, options, isIncrementing, setCursor]);

  // reset cursor on each open
  useEffect(() => {
    if (isOpen) setCursor(0);
  }, [isOpen, setCursor]);

  return {
    cursor,
    setCursor,
  };
};
