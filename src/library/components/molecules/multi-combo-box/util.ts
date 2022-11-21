import { InputOption, InternalInputOption } from "./types";
import { v4 as uuidv4 } from "uuid";

export const createInternalOptions = <ValueType extends string | number>(
  options: InputOption<ValueType>[]
) =>
  options.map((option) => ({
    ...option,
    label: option.label || `${option.value}`,
    id: uuidv4(),
  }));

export const defaultFilter = <ValueType extends string | number>(
  options: InternalInputOption<ValueType>[],
  value: string
) =>
  options.filter((option) =>
    option.label.toLowerCase().includes(value.toLowerCase())
  );

export const excludeSelectedOptions = <ValueType extends string | number>(
  options: InternalInputOption<ValueType>[],
  optionsToExclude: InternalInputOption<ValueType>[]
) => {
  const selectedIds = optionsToExclude.map((option) => option.id);
  return options.filter((option) => !selectedIds.includes(option.id));
};

export const isSelected = <ValueType extends string | number>(
  id: string,
  selectedOptions: InternalInputOption<ValueType>[]
) => selectedOptions.some((option) => option.id === id);
