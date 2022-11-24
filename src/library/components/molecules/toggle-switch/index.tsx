import { motion } from "framer-motion";
import React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SpringColors } from "../../../types/spring-colors";
import { SpringSizes } from "../../../types/spring-sizes";
import setClasses from "../../../util/set-classes";

import { Flex } from "../../atoms/flex";
import { Label } from "../../atoms/label";

export interface ToggleSwitchProps<Name extends string> {
  name: Name;
  label?: string;
  onChange: (name: Name, value: boolean) => void;
  value?: boolean;
  id?: string;
  color?: keyof typeof toggleWrapperColors;
  size?: keyof typeof toggleSizes;
  disabled?: boolean;
}

const toggleSizes: SpringSizes = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
  xl: "h-9 w-9",
};

const toggleWrapperSizes: SpringSizes = {
  xs: "h-4 w-8",
  sm: "h-5 w-10",
  md: "h-6 w-12",
  lg: "h-8 w-16",
  xl: "h-10 w-20",
};

const toggleWrapperColors: SpringColors = {
  brand: "bg-brand-500 ring-brand-200",
  secondary: "bg-brand-200 ring-brand-500",
  accent: "bg-accent-500 ring-accent-200",
  success: "bg-success-500 ring-success-200",
  error: "bg-error-500 ring-error-200",
  warning: "bg-warning-500 ring-warning-200",
  light: "bg-gray-500 ring-gray-200",
  dark: "bg-gray-900 ring-gray-700",
  none: "",
};

const wrapperOutlineColors: SpringColors = {
  brand: "outline-brand-200",
  secondary: "outline-brand-500",
  accent: "outline-accent-200",
  success: "outline-success-200",
  error: "outline-error-200",
  warning: "outline-warning-200",
  light: "outline-gray-200",
  dark: "outline-gray-700",
  none: "",
};

export const ToggleSwitch = <Name extends string>({
  name,
  label,
  onChange,
  value = false,
  id,
  color = "brand",
  size = "md",
  disabled = false,
}: ToggleSwitchProps<Name>) => {
  const savedOnChange = useRef(onChange);

  const [state, setState] = useState(value);

  const handleClick = useCallback(() => {
    if (!disabled) setState((prev) => !prev);
  }, [disabled]);

  // handle onChange callback
  useEffect(() => {
    savedOnChange.current(name, state);
  }, [state, name]);

  // handle dynamic value change
  // adds some unnecessary rerenders, but it's simple.
  useEffect(() => {
    if (!disabled) setState(value);
  }, [value, disabled]);

  const wrapperClassName = useMemo(
    () =>
      setClasses([
        "mr-3 rounded-full px-0.5 shadow-inner outline-offset-1 transition-colors duration-150 ease-in-out",
        state ? toggleWrapperColors[color] : "bg-gray-200",
        wrapperOutlineColors[color],
        !disabled && "focus:ring-2",
        toggleWrapperSizes[size],
      ]),
    [state, color, size, disabled]
  );

  const containerClassNames = useMemo(
    () =>
      setClasses([
        "h-fit w-fit",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
      ]),
    [disabled]
  );

  const toggleClassNames = useMemo(
    () => setClasses(["rounded-full bg-white shadow-sm", toggleSizes[size]]),
    [size]
  );

  return (
    <Flex
      onClick={handleClick}
      className={containerClassNames}
      direction="row"
      align="center"
    >
      <Flex
        align="center"
        justify={state ? "end" : "start"}
        className={wrapperClassName}
        tabIndex={disabled ? -1 : 0}
      >
        <motion.div layout className={toggleClassNames} />
      </Flex>
      {label && (
        <Label
          className={`${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } select-none`}
          htmlFor={id ? id : name}
        >
          {label}
        </Label>
      )}
      <input
        type="checkbox"
        className="pointer-events-none appearance-none"
        readOnly
        aria-label={label ? label : name}
        value={state ? "true" : "false"}
        name={name}
      />
    </Flex>
  );
};
