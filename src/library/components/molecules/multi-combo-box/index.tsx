import { useContext } from "react";
import { InputText } from "../../atoms/input-texts";
import { Label } from "../../atoms/label";
import { MultiComboBoxContainer } from "./container";
import { MultiComboBoxFilterableInput } from "./filterable-input";
import { MultiComboBoxOptions } from "./options";
import {
  MultiComboBoxContext,
  MultiComboBoxContextInterface,
  MultiComboBoxProvider,
  MultiComboBoxProviderProps,
} from "./provider";

export interface MultiComponentProps {
  isFilterable?: boolean;
  width?: React.CSSProperties["width"];
  error?: string;
  disabled?: boolean;
  helperText?: string;
  label?: string;
}

const Component = <ValueType extends string | number, Name extends string>({
  isFilterable = true,
  width,
  error,
  disabled,
  helperText,
  label,
}: MultiComponentProps) => {
  const { floating, name } =
    useContext<MultiComboBoxContextInterface<ValueType, Name>>(
      MultiComboBoxContext
    );
  return (
    <div
      ref={floating.reference}
      className="perspective-2xl group relative h-fit w-full"
    >
      {label && (
        <Label
          htmlFor={name}
          className="mb-1 transition-colors duration-150 ease-in-out group-focus-within:text-gray-900"
        >
          {label}
        </Label>
      )}
      <MultiComboBoxContainer
        error={error}
        disabled={disabled}
        isFilterable={isFilterable}
      >
        {isFilterable && <MultiComboBoxFilterableInput />}
      </MultiComboBoxContainer>
      {error && (
        <InputText variant="error" className="mt-2 block">
          {error}
        </InputText>
      )}
      {helperText && !error && (
        <InputText className="mt-2 block">{helperText}</InputText>
      )}
      <MultiComboBoxOptions width={width} />
    </div>
  );
};

export const MultiComboBox = <
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
  customBadges,
  pill,
  ...rest
}: MultiComboBoxProviderProps<ValueType, Name> & MultiComponentProps) => {
  return (
    <MultiComboBoxProvider
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
      customBadges={customBadges}
      pill={pill}
    >
      <Component {...rest} />
    </MultiComboBoxProvider>
  );
};
