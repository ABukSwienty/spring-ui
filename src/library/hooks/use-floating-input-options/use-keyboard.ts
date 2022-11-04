import { RefObject, useCallback, useEffect } from "react";
import useKeyboardNavigation from "../use-keyboard-navigation";
import { InternalInputOption } from "./types";

/**
 * Handles the keyboard navigation of the floating input options
 */
export const useFloatingInputOptionsKeyboard = <ValueType>(
  options: React.MutableRefObject<InternalInputOption<ValueType>[]>,
  handleSelect: (id: string) => void,
  element: RefObject<HTMLElement>,
  isOpen: boolean,
  maxCursorPos?: number
) => {
  const handleEnter = useCallback(
    (cursor: number) => {
      if (!options) return;

      const selected = options.current[cursor];

      if (!selected) return;
      if (selected.disabled) return;
      handleSelect(selected.id);
    },
    [handleSelect, options]
  );

  const { cursor, setCursor, isIncrementing } = useKeyboardNavigation({
    maxCursorPos:
      maxCursorPos !== undefined ? maxCursorPos : options.current.length - 1,
    onEnter: handleEnter,
    element,
  });

  // pretty sure this is a hack
  // avoid cursor selecting disabled options
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
