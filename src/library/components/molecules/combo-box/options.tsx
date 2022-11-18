import { useCallback, useContext, useMemo, useState } from "react";
import useEventListener from "../../../hooks/use-event-listener";
import { FloatingInputDropdown } from "../floating/floating-input-dropdown";
import { FloatingInputItem } from "../floating/floating-input-item";
import DefaultNoResults from "./default-no-results";
import { ComboBoxContextInterface, ComboBoxContext } from "./provider";

export interface ComboBoxOptionsProps {
  width?: React.CSSProperties["width"];
}

export const ComboBoxOptions = <
  ValueType extends string | number,
  Name extends string
>({
  width = "100%",
}: ComboBoxOptionsProps) => {
  const [cursor, setCursor] = useState(0);
  const {
    inputRef,
    floating,
    state: { filteredOptions, isOpen, selectedOption },
    dispatch,
    customOptions,
  } = useContext<ComboBoxContextInterface<ValueType, Name>>(ComboBoxContext);

  const noResults = filteredOptions.length === 0;

  const handleClick = useCallback(
    (id: string) => dispatch({ type: "select", id }),
    [dispatch]
  );

  const renderables = useMemo(() => {
    return filteredOptions.map((option, index) => (
      <FloatingInputItem
        key={option.id}
        id={option.id}
        isCursor={cursor === index}
        isDisabled={option.disabled ? true : false}
        isSelected={selectedOption?.id === option.id}
        onClick={handleClick}
      >
        {customOptions.current ? customOptions.current(option) : option.label}
      </FloatingInputItem>
    ));
  }, [filteredOptions, cursor, selectedOption, handleClick, customOptions]);

  // handle keyboard events
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setCursor((prev) => Math.min(filteredOptions.length - 1, prev + 1));
          break;

        case "ArrowUp":
          e.preventDefault();
          setCursor((prev) => Math.max(0, prev - 1));
          break;
        case "Enter":
          e.preventDefault();
          dispatch({ type: "select", id: filteredOptions[cursor].id });
          inputRef.current?.blur();
          break;

        case "Escape":
          e.preventDefault();
          dispatch({ type: "close" });
          break;
      }
    },
    [dispatch, filteredOptions, cursor, inputRef]
  );

  // handle keyboard events
  useEventListener("keydown", keyDownHandler, inputRef);

  return (
    <>
      <FloatingInputDropdown
        ref={floating.floating}
        isOpen={isOpen}
        top={floating.y ?? 0}
        left={floating.x ?? 0}
        width={width}
        position={floating.strategy}
      >
        {!noResults && renderables}
        {noResults && <DefaultNoResults />}
      </FloatingInputDropdown>
    </>
  );
};
