import { useState, useCallback, useEffect, useRef } from "react";
import usePublisherSubscriber from "../use-publisher-subscriber";
import { InternalInputOption } from "./types";

export interface UseFloatingInputOptionsSingleHandlers<ValueType> {
  value: ValueType | undefined;
  options: React.MutableRefObject<InternalInputOption<ValueType>[]>;
}

/**
 * Handles the values and selection of the floating input options
 */
export const useFloatingInputOptionsSingleHandlers = <ValueType>({
  value,
  options,
}: UseFloatingInputOptionsSingleHandlers<ValueType>) => {
  const [selected, setSelected] = useState<
    InternalInputOption<ValueType> | undefined
  >(undefined);

  const onSelect = usePublisherSubscriber<
    InternalInputOption<ValueType> | undefined
  >();

  const onClear = usePublisherSubscriber<undefined>();

  const handleSelect = useCallback(
    (id: string) => {
      if (!options) return;
      const option = options.current.find((o) => o.id === id);
      if (!option) return;

      onSelect.emit(option);
      setSelected(option);
    },
    [options, onSelect]
  );

  const handleClear = useCallback(() => {
    onClear.emit(undefined);
    setSelected(undefined);
  }, [onClear]);

  // handles external value changes
  useEffect(() => {
    if (!value) return;
    if (value === selected?.value) return;
    const option = options.current.find((o) => o.value === value);
    if (!option) return;
    handleSelect(option.id);
  }, [value, selected, handleSelect, options]);

  return {
    onSelect: onSelect.on,
    onClear: onClear.on,
    handleSelect,
    handleClear,
    selected,
  };
};
