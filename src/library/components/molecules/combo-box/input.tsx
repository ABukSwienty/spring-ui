import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useContext } from "react";
import { ComponentProps } from ".";
import setClasses from "../../../util/set-classes";
import { Input } from "../input";
import { ComboBoxContextInterface, ComboBoxContext } from "./provider";

export const ComboBoxInput = <
  ValueType extends string | number,
  Name extends string
>({
  trailingIcon,
  className,
  ...inputProps
}: ComponentProps) => {
  const {
    inputRef,
    name,
    color,
    dispatch,
    state: { inputValue },
  } = useContext<ComboBoxContextInterface<ValueType, Name>>(ComboBoxContext);

  const handleFocus = useCallback(() => dispatch({ type: "open" }), [dispatch]);

  const classNames = setClasses([
    className,
    "cursor-pointer select-none caret-transparent selection:bg-transparent",
  ]);

  return (
    <>
      <Input
        ref={inputRef}
        name={name}
        color={color}
        value={inputValue}
        readOnly
        className={classNames}
        onFocus={handleFocus}
        trailingIcon={ChevronUpDownIcon}
        {...inputProps}
      />
    </>
  );
};
