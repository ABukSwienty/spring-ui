import React, { useState, useCallback, useEffect } from "react";
import { InternalInputOption } from "./types";

export interface UseFloatingInputOptionsFilterParams<ValueType> {
  options: React.MutableRefObject<InternalInputOption<ValueType>[]>;
  debounce?: number;
}

export interface UseFloatingInputOptionsFilterReturn<ValueType> {
  /**
   * The filtered options. Default filtering is done by the `label` property.
   */
  filtered: InternalInputOption<ValueType>[];
  /**
   * Standard change handler for an input field.
   */
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * The current input value.
   */
  inputValue: string;
  /**
   * Input value state setter.
   */
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  /**
   * Boolean flag.
   */
  clearOnChangeFlag: boolean;
  /**
   * Boolean flag state setter.
   */
  setClearOnChangeFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Filters the input options based on the current input value.
 * @param Object options
 * @returns
 */
export const useFloatingInputOptionsFilter = <ValueType>({
  options,
  debounce = 300,
}: UseFloatingInputOptionsFilterParams<ValueType>): UseFloatingInputOptionsFilterReturn<ValueType> => {
  const [inputValue, setInputValue] = useState("");
  const [filtered, setFiltered] = useState(options.current);
  const [clearOnChangeFlag, setClearOnChangeFlag] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
    []
  );

  useEffect(() => {
    const debouncer = setTimeout(() => {
      const filtered = options.current.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFiltered(filtered);
    }, debounce);

    return () => clearTimeout(debouncer);
  }, [inputValue, options, debounce]);

  return {
    filtered,
    handleChange,
    inputValue,
    setInputValue,
    clearOnChangeFlag,
    setClearOnChangeFlag,
  };
};
