import { useState, useCallback, useEffect } from "react";
import { InternalInputOption } from "./types";

export interface UseFloatingInputOptionsSingleHandlers<ValueType, Name> {
  ref: React.RefObject<HTMLInputElement>;
  value: ValueType | undefined;
  name: Name;
  isOpen: boolean;
  closeOnSelect: boolean;
  selectCloseDelay: number;
  options: React.MutableRefObject<InternalInputOption<ValueType>[]>;
  onChange: React.MutableRefObject<
    (value: ValueType | undefined, name: Name) => void
  >;
  handleClose: () => void;
  handleOpen: () => void;
}

/**
 * Handles the values and selection of the floating input options
 */
export const useFloatingInputOptionsSingleHandlers = <ValueType, Name>({
  ref,
  value,
  name,
  isOpen,
  closeOnSelect,
  selectCloseDelay,
  options,
  onChange,
  handleClose,
  handleOpen,
}: UseFloatingInputOptionsSingleHandlers<ValueType, Name>) => {
  const [selected, setSelected] = useState<
    InternalInputOption<ValueType> | undefined
  >(undefined);

  const handleSelect = useCallback(
    (id: string) => {
      if (!options) return;
      const option = options.current.find((o) => o.id === id);
      if (!option) return;

      setSelected(option);
      onChange.current(option.value, name);

      if (closeOnSelect) {
        setTimeout(() => {
          handleClose();
        }, selectCloseDelay);
      }
    },
    [name, options, handleClose, closeOnSelect, selectCloseDelay, onChange]
  );

  const handleClick = useCallback(() => {
    if (!isOpen) {
      handleOpen();
      return;
    }

    handleClose();

    if (ref.current) {
      ref.current.blur();
    }
  }, [isOpen, handleClose, handleOpen, ref]);

  const handleClear = useCallback(() => {
    setSelected(undefined);
    onChange.current(undefined, name);

    if (closeOnSelect) {
      setTimeout(() => {
        handleClose();
      }, selectCloseDelay);
    }
  }, [closeOnSelect, handleClose, name, onChange, selectCloseDelay]);

  useEffect(() => {
    if (!value) return;
    if (value === selected?.value) return;
    const option = options.current.find((o) => o.value === value);
    if (!option) return;
    handleSelect(option.id);
  }, [value, selected, handleSelect, options]);

  return {
    handleClick,
    handleSelect,
    handleClear,
    selected,
  };
};
