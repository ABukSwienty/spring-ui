import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useCallback, useRef, useState } from "react";
import { IconButton } from "../../atoms/icon-button";
import { Input, InputProps } from "../input";

export interface PasswordInputProps
  extends Omit<
    InputProps,
    | "trailingIcon"
    | "trailingAddon"
    | "trailingElement"
    | "trailingInlineAddon"
    | "type"
  > {
  validator?: (value: string) => boolean;
  validateOnInput?: boolean;
}

const TogglePassword = ({
  isHidden,
  onClick,
}: {
  isHidden: boolean;
  onClick: () => void;
}) => {
  return (
    <IconButton
      size="md"
      tooltip={isHidden ? "Show password" : "Hide password"}
      color="none"
      icon={isHidden ? EyeIcon : EyeSlashIcon}
      onClick={onClick}
    />
  );
};

const defaultValidator = (value: string) => {
  const special = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  const numbers = /[0-9]+/;
  const lowerCase = /[a-z]+/;
  const upperCase = /[A-Z]+/;

  return (
    special.test(value) &&
    numbers.test(value) &&
    lowerCase.test(value) &&
    upperCase.test(value) &&
    value.length >= 8
  );
};

export const PasswordInput = ({
  name,
  color = "brand",
  validator,
  validateOnInput = false,
  ...rest
}: PasswordInputProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const validateStrategy = useRef(validator || defaultValidator);

  const handleToggleHidden = useCallback(
    () => setIsHidden((prev) => !prev),
    []
  );

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (rest.onChange) rest.onChange(e);
    if (validateOnInput) setIsValid(validateStrategy.current(e.target.value));
  };

  return (
    <Input
      name={name}
      type={isHidden ? "password" : "text"}
      color={isValid ? "success" : color}
      onChange={handleValue}
      {...rest}
      trailingElement={
        <TogglePassword isHidden={isHidden} onClick={handleToggleHidden} />
      }
    />
  );
};
