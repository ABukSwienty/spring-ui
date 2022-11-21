import React, { useCallback, useContext, useEffect, useRef } from "react";
import { MultiComponentProps } from ".";
import setClasses from "../../../util/set-classes";
import {
  MultiComboBoxContextInterface,
  MultiComboBoxContext,
} from "./provider";

import { defaultFilter } from "./util";

export const MultiComboBoxFilterableInput = <
  ValueType extends string | number,
  Name extends string
>(
  inputProps: MultiComponentProps
) => {
  const {
    inputRef,
    name,
    color,
    dispatch,
    state: { options, inputValue, isOpen },
    customFilter,
  } = useContext<MultiComboBoxContextInterface<ValueType, Name>>(
    MultiComboBoxContext
  );

  const classNames = setClasses([
    "appearance-none border-none focus:outline-none",
    isOpen ? "inline-block" : "hidden",
  ]);

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

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen, inputRef]);

  return (
    <>
      <input
        ref={inputRef}
        name={name}
        color={color}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        {...inputProps}
        className={classNames}
      />
    </>
  );
};
