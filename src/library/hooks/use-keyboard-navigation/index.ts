import React, { RefObject, useCallback, useRef, useState } from "react";
import useEventListener from "../use-event-listener";
import useKeyboardStrategy from "./use-keyboard-strategy";

export type KeyboardStrategy = "vertical" | "horizontal";

export interface UseKeyboardNavigation<T extends HTMLElement> {
  strategy?: KeyboardStrategy;
  initialCursorPos?: number;
  maxCursorPos?: number;
  onEnter?: (
    cursor: number,
    setCursor: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  element?: React.RefObject<T>;
}

const useKeyboardNavigation = <T extends HTMLElement>({
  strategy = "vertical",
  initialCursorPos = 0,
  maxCursorPos = Infinity,
  onEnter,
  element = { current: null },
}: UseKeyboardNavigation<T>) => {
  const [cursor, setCursor] = useState(initialCursorPos);

  const { strategy: strategyFn, isIncrementing } =
    useKeyboardStrategy(strategy);

  const savedOnEnter = useRef(onEnter);

  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      strategyFn(e, setCursor, maxCursorPos);

      if (e.key === "Enter" && savedOnEnter.current) {
        e.preventDefault();
        savedOnEnter.current(cursor, setCursor);
      }
    },
    [strategyFn, maxCursorPos, cursor]
  );

  useEventListener("keydown", keyDownHandler, element);

  return {
    cursor,
    setCursor,
    isIncrementing,
  };
};

export default useKeyboardNavigation;
