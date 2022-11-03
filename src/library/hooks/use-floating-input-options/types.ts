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
