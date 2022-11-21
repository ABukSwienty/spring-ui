export interface InputOption<ValueType> {
  label?: string;
  value: ValueType;
  disabled?: boolean;
  [key: string]: any;
}

export interface InternalInputOption<ValueType> extends InputOption<ValueType> {
  label: string;
  id: string;
}

export interface State<ValueType> {
  isOpen: boolean;
  filteredOptions: InternalInputOption<ValueType>[];
  options: InternalInputOption<ValueType>[];
  selectedOption: InternalInputOption<ValueType> | undefined;
  inputValue: string;
  selectMode: SelectMode;
}

export type SelectMode = "select" | "select-deselect";

export type StateActions<ValueType> =
  | { type: "open" }
  | { type: "close" }
  | { type: "select"; id: string }
  | { type: "filter"; payload: InternalInputOption<ValueType>[] }
  | { type: "clear" }
  | { type: "onExternalValueChange"; value: ValueType | undefined }
  | { type: "onInputChange"; value: string };
