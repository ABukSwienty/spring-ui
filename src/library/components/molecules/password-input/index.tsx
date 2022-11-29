import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
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
  /**
   * Strength of the password. If set to false, the strength indicator will be hidden. Range is 0 to 1.
   */
  strength?: number | false;
}

const StrengthIndicator = ({ strength }: { strength: number }) => {
  return (
    <div className="h-2 w-12 overflow-hidden rounded-full bg-gray-200">
      <motion.div
        className="h-full w-full origin-left rounded-full"
        initial={{
          scaleX: 0,
          backgroundColor: "rgb(239 68 68 / 1",
        }}
        animate={{
          scaleX: strength,
          backgroundColor:
            strength < 0.3
              ? "rgb(239 68 68 / 1)"
              : strength < 0.6
              ? "rgb(234 179 8 / 1)"
              : "rgb(34 197 94 / 1)",
        }}
      />
    </div>
  );
};

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
  strength = false,
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
      cornerElement={
        strength !== false ? (
          <StrengthIndicator strength={Math.min(1, strength)} />
        ) : undefined
      }
      trailingElement={
        <TogglePassword isHidden={isHidden} onClick={handleToggleHidden} />
      }
    />
  );
};
