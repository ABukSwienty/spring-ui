import { useRef, useState } from "react";
import { Input, InputProps } from "../input";
import { formatters } from "./formatters";

export interface FormattedInputProps extends InputProps {
  format?: keyof typeof formatters;
  customFormatter?: (value: string) => string;
}

export const FormattedInput = ({
  format = "creditCard",
  customFormatter,
  ...props
}: FormattedInputProps) => {
  const [state, setState] = useState(props.value || "");
  const formatStrategy = useRef(customFormatter || formatters[format]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState(formatStrategy.current(value));
    if (props.onChange) props.onChange(e);
  };

  return <Input {...props} value={state} onChange={handleChange} />;
};
