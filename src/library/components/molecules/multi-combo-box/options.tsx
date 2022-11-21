import { useCallback, useContext, useMemo, useState } from "react";
import useEventListener from "../../../hooks/use-event-listener";
import { FloatingInputDropdown } from "../floating/floating-input-dropdown";
import { FloatingInputItem } from "../floating/floating-input-item";
import DefaultNoResults from "./default-no-results";
import {
  MultiComboBoxContext,
  MultiComboBoxContextInterface,
} from "./provider";
import { excludeSelectedOptions, isSelected } from "./util";

export interface MultiComboBoxOptionsProps {
  width?: React.CSSProperties["width"];
}

export const MultiComboBoxOptions = <
  ValueType extends string | number,
  Name extends string
>({
  width = "100%",
}: MultiComboBoxOptionsProps) => {
  const [cursor, setCursor] = useState(0);
  const {
    inputRef,
    floating,
    state: { filteredOptions, isOpen, selectedOptions, inputValue, options },
    dispatch,
    customOptions,
    customNoResults,
  } = useContext<MultiComboBoxContextInterface<ValueType, Name>>(
    MultiComboBoxContext
  );

  const noResults = filteredOptions.length === 0;

  const selectedAll = selectedOptions.length === options.length;

  const handleClick = useCallback(
    (id: string) => dispatch({ type: "select", id }),
    [dispatch]
  );

  const renderables = useMemo(() => {
    return excludeSelectedOptions(filteredOptions, selectedOptions).map(
      (option, index) => {
        return (
          <FloatingInputItem
            key={option.id}
            id={option.id}
            isCursor={cursor === index}
            isDisabled={option.disabled ? true : false}
            isSelected={isSelected(option.id, selectedOptions)}
            onClick={handleClick}
          >
            {customOptions.current
              ? customOptions.current(
                  option,
                  isSelected(option.id, selectedOptions),
                  cursor === index
                )
              : option.label}
          </FloatingInputItem>
        );
      }
    );
  }, [filteredOptions, cursor, selectedOptions, handleClick, customOptions]);

  // handle keyboard events
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setCursor((prev) =>
            Math.min(
              excludeSelectedOptions(filteredOptions, selectedOptions).length -
                1,
              prev + 1
            )
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setCursor((prev) => Math.max(0, prev - 1));
          break;

        case "Enter":
          e.preventDefault();
          dispatch({
            type: "select",
            id: excludeSelectedOptions(filteredOptions, selectedOptions)[cursor]
              .id,
          });
          break;

        case "Backspace":
          dispatch({ type: "onBackspace" });
          break;

        case "Escape":
          e.preventDefault();
          dispatch({ type: "close" });
          break;
      }
    },
    [dispatch, filteredOptions, cursor, selectedOptions]
  );

  // handle keyboard events
  useEventListener("keydown", keyDownHandler, inputRef);

  const handleClose = useCallback(
    () => dispatch({ type: "close" }),
    [dispatch]
  );

  const renderNoResults = customNoResults.current ? (
    customNoResults.current(inputValue, handleClose)
  ) : (
    <DefaultNoResults />
  );

  return (
    <>
      {!selectedAll && (
        <FloatingInputDropdown
          ref={floating.floating}
          isOpen={isOpen}
          top={floating.y ?? 0}
          left={floating.x ?? 0}
          width={width}
          position={floating.strategy}
        >
          {!noResults && renderables}
          {noResults && renderNoResults}
        </FloatingInputDropdown>
      )}
    </>
  );
};
