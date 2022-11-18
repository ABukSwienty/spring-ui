import { useContext } from "react";
import { InputProps } from "../input";
import { ComboBoxFilterableInput } from "./filterable-input";
import { ComboBoxInput } from "./input";
import { ComboBoxOptions } from "./options";
import {
  ComboBoxContext,
  ComboBoxContextInterface,
  ComboBoxProvider,
  ComboBoxProviderProps,
} from "./provider";

export interface ComponentProps
  extends Omit<
    InputProps,
    "value" | "onChange" | "onFocus" | "name" | "color"
  > {
  isFilterable?: boolean;
  width?: React.CSSProperties["width"];
}

const Component = <ValueType extends string | number, Name extends string>({
  isFilterable = true,
  width,
  ...inputProps
}: ComponentProps) => {
  const { floating } =
    useContext<ComboBoxContextInterface<ValueType, Name>>(ComboBoxContext);
  return (
    <div
      ref={floating.reference}
      className="perspective-2xl relative h-fit w-full"
    >
      {isFilterable ? (
        <ComboBoxFilterableInput {...inputProps} />
      ) : (
        <ComboBoxInput {...inputProps} />
      )}
      <ComboBoxOptions width={width} />
    </div>
  );
};

export const ComboBox = <
  ValueType extends string | number,
  Name extends string
>({
  children,
  options,
  name,
  color,
  placement,
  offset,
  onChange,
  value,
  customOptions,
  customFilter,
  customNoResults,
  ...rest
}: ComboBoxProviderProps<ValueType, Name> & ComponentProps) => {
  return (
    <ComboBoxProvider
      options={options}
      name={name}
      color={color}
      placement={placement}
      offset={offset}
      onChange={onChange}
      value={value}
      customOptions={customOptions}
      customFilter={customFilter}
      customNoResults={customNoResults}
    >
      <Component {...rest} />
    </ComboBoxProvider>
  );
};
