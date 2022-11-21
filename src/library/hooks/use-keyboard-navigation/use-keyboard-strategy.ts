import { useCallback, useRef } from "react";
import { KeyboardStrategy } from ".";

type CursorState = React.Dispatch<React.SetStateAction<number>>;

const useKeyboardStrategy = (strategy: KeyboardStrategy) => {
  const isIncrementing = useRef(false);
  const increment = useCallback(
    (setCursor: CursorState, max: number) =>
      setCursor((prev) => Math.min(max, prev + 1)),
    []
  );
  const decrement = useCallback(
    (setCursor: CursorState) => setCursor((prev) => Math.max(0, prev - 1)),
    []
  );
  const vertical = useCallback(
    (e: KeyboardEvent, setCursor: CursorState, max: number) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          decrement(setCursor);
          isIncrementing.current = false;
          break;

        case "ArrowDown":
          e.preventDefault();
          increment(setCursor, max);
          isIncrementing.current = true;
          break;
      }
    },
    [decrement, increment]
  );

  const horizontal = useCallback(
    (e: KeyboardEvent, setCursor: CursorState, max: number) => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          increment(setCursor, max);
          isIncrementing.current = true;
          break;

        case "ArrowLeft":
          e.preventDefault();
          decrement(setCursor);
          isIncrementing.current = false;
          break;
      }
    },
    [increment, decrement]
  );

  return {
    strategy: strategy === "vertical" ? vertical : horizontal,
    isIncrementing: isIncrementing.current,
  };
};

export default useKeyboardStrategy;
