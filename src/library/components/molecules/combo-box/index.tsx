import { useContext } from "react";
import { InputProps } from "../input";
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
  > {}

const Component = <ValueType extends string | number, Name extends string>(
  inputProps: ComponentProps
) => {
  const { floating } =
    useContext<ComboBoxContextInterface<ValueType, Name>>(ComboBoxContext);
  return (
    <div
      ref={floating.reference}
      className="perspective-2xl relative h-fit w-full"
    >
      <ComboBoxInput {...inputProps} />
      <ComboBoxOptions />
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
    >
      <Component {...rest} />
    </ComboBoxProvider>
  );
};
