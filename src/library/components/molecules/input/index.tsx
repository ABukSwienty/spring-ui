import React, { FC, useCallback, useState } from "react";
import { SpringColors } from "../../../types/spring-colors";
import setClasses from "../../../util/set-classes";
import { Flex } from "../../atoms/flex";
import { InputText } from "../../atoms/input-texts";
import { Label } from "../../atoms/label";
import { AddOn } from "./add-on";
import { CornerTip } from "./corner-tip";
import { InputIcon } from "./input-icon";

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "children" | "style"> {
  label?: string;
  id?: string;
  name: string;
  error?: string;
  leadingIcon?: FC<React.ComponentProps<"svg">>;
  trailingIcon?: FC<React.ComponentProps<"svg">>;
  color?: keyof typeof inputColors;
  helperText?: string;
  leadingInlineAddOn?: string;
  trailingInlineAddOn?: string;
  leadingAddOn?: string;
  trailingAddOn?: string;
  trailingElement?: React.ReactNode;
  cornerHint?: string;
  cornerElement?: React.ReactNode;
  cornerTip?: string;
}

const inputColors: SpringColors = {
  brand: "focus:ring-brand-700",
  secondary: "focus:ring-brand-400",
  accent: "focus:ring-accent-700",
  success: "focus:ring-success-500",
  error: "focus:ring-error-500",
  warning: "focus:ring-warning-500",
  light: "focus:ring-gray-200",
  dark: "focus:ring-gray-800",
  none: "",
};

const useRefCallback = <RefType,>(callback: (node: RefType | null) => void) => {
  const ref = useCallback(callback, [callback]);
  return { ref };
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      name,
      error,
      leadingIcon,
      trailingIcon,
      color = "brand",
      className,
      helperText,
      leadingInlineAddOn,
      trailingInlineAddOn,
      leadingAddOn,
      trailingAddOn,
      trailingElement,
      type = "text",
      cornerHint,
      cornerElement,
      cornerTip,
      ...props
    },
    ref
  ) => {
    const [inputStyles, setInputStyles] = useState({});

    const handleLeading = useCallback(
      (node: HTMLElement | SVGSVGElement | null) => {
        if (node) {
          const { width } = node.getBoundingClientRect();
          setInputStyles((prev) => ({ ...prev, paddingLeft: width + 8 }));
        }
      },
      []
    );

    const handleTrailing = useCallback(
      (node: HTMLElement | SVGSVGElement | null) => {
        if (node) {
          const { width } = node.getBoundingClientRect();
          setInputStyles((prev) => ({ ...prev, paddingRight: width + 8 }));
        }
      },
      []
    );

    const { ref: leadingRef } = useRefCallback(handleLeading);

    const { ref: trailingRef } = useRefCallback(handleTrailing);

    const classNames = setClasses([
      "peer w-full appearance-none rounded-md py-2 px-3 text-sm font-light ring-1 transition-shadow duration-150 ease-in-out focus:outline-none focus:ring-2 shadow-sm text-ellipsis",
      !error && "ring-gray-200",
      !error && inputColors[color],
      error && inputColors["error"] + " ring-error-500",
      className,
      props.disabled && "cursor-not-allowed bg-gray-100",
    ]);

    return (
      <div className="group h-fit w-full">
        <Flex
          direction="row"
          align="end"
          justify="between"
          className={
            label || cornerHint || cornerElement || cornerTip ? "mb-1" : ""
          }
        >
          {label && (
            <Label
              htmlFor={id ? id : name}
              className="transition-colors duration-150 ease-in-out group-focus-within:text-gray-900"
            >
              {label}
            </Label>
          )}
          {cornerHint && (
            <InputText variant="cornerHint">{cornerHint}</InputText>
          )}
          {cornerElement && cornerElement}
          {cornerTip && <CornerTip tip={cornerTip} />}
        </Flex>
        <Flex className="relative h-full w-full" direction="row" align="center">
          {leadingIcon && (
            <InputIcon
              ref={leadingRef}
              color={color}
              icon={leadingIcon}
              className="pl-3"
              isError={!!error}
            />
          )}
          {leadingInlineAddOn && (
            <AddOn
              ref={leadingRef}
              text={leadingInlineAddOn}
              className="left-0 pl-3"
            />
          )}
          {leadingAddOn && (
            <AddOn
              ref={leadingRef}
              text={leadingAddOn}
              className="left-0 rounded-md rounded-r-none border-r bg-gray-50 px-3"
            />
          )}
          <input
            ref={ref}
            id={id ? id : name}
            name={name}
            type={type}
            className={classNames}
            style={inputStyles}
            {...props}
          />
          {trailingIcon && (
            <InputIcon
              ref={trailingRef}
              color={color}
              icon={trailingIcon}
              className="right-0 pr-3"
              isError={!!error}
            />
          )}
          {trailingInlineAddOn && (
            <AddOn
              ref={trailingRef}
              text={trailingInlineAddOn}
              className="right-0 pr-3"
            />
          )}
          {trailingAddOn && (
            <AddOn
              ref={trailingRef}
              text={trailingAddOn}
              className="right-0 rounded-md rounded-l-none border-l bg-gray-50 px-3"
            />
          )}
          {trailingElement && (
            <div ref={trailingRef} className="absolute inset-y-0 right-0">
              {trailingElement}
            </div>
          )}
        </Flex>

        {error && (
          <InputText variant="error" className="mt-2 block">
            {error}
          </InputText>
        )}
        {helperText && !error && (
          <InputText className="mt-2 block">{helperText}</InputText>
        )}
      </div>
    );
  }
);
