import React, { useCallback, useContext, useEffect, useRef } from "react";
import { ComponentProps } from ".";
import { Input } from "../input";
import { ComboBoxContextInterface, ComboBoxContext } from "./provider";
import { defaultFilter } from "./util";

export const ComboBoxFilterableInput = <
  ValueType extends string | number,
  Name extends string
>(
  inputProps: ComponentProps
) => {
  const {
    inputRef,
    name,
    color,
    dispatch,
    state: { options, inputValue },
    customFilter,
  } = useContext<ComboBoxContextInterface<ValueType, Name>>(ComboBoxContext);

  const filterStrategy = useRef(customFilter.current || defaultFilter);

  const handleFocus = useCallback(() => dispatch({ type: "open" }), [dispatch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "onInputChange", value: e.target.value }),
    [dispatch]
  );

  // filter
  useEffect(() => {
    const debouncer = setTimeout(() => {
      dispatch({
        type: "filter",
        payload: filterStrategy.current(options, inputValue),
      });
    }, 300);

    return () => clearTimeout(debouncer);
  }, [dispatch, options, inputValue]);

  return (
    <>
      <Input
        ref={inputRef}
        name={name}
        color={color}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        {...inputProps}
      />
    </>
  );
};
