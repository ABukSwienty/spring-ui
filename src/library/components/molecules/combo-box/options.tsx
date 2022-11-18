import { useCallback, useContext, useMemo, useState } from "react";
import useEventListener from "../../../hooks/use-event-listener";
import { FloatingInputDropdown } from "../floating/floating-input-dropdown";
import DefaultNoResults from "./default-no-results";
import { ComboBoxItem } from "./item";
import { ComboBoxContextInterface, ComboBoxContext } from "./provider";

export const ComboBoxOptions = <
  ValueType extends string | number,
  Name extends string
>() => {
  const [cursor, setCursor] = useState(0);
  const {
    inputRef,
    floating,
    state: { filteredOptions, isOpen },
    dispatch,
  } = useContext<ComboBoxContextInterface<ValueType, Name>>(ComboBoxContext);

  const noResults = filteredOptions.length === 0;

  const renderables = useMemo(() => {
    return filteredOptions.map((option, index) => (
      <ComboBoxItem
        key={option.id}
        id={option.id}
        isCursor={cursor === index}
        isDisabled={option.disabled ? true : false}
      >
        {option.label}
      </ComboBoxItem>
    ));
  }, [filteredOptions, cursor]);

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
        width="100%"
        position={floating.strategy}
      >
        {!noResults && renderables}
        {noResults && <DefaultNoResults />}
      </FloatingInputDropdown>
    </>
  );
};
