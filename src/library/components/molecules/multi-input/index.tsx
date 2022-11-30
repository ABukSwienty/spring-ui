import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { Button, IconButton } from "../../..";
import { Colors } from "../../../types/colors";
import setClasses from "../../../util/set-classes";
import { Flex } from "../../atoms/flex";
import { InputText } from "../../atoms/input-texts";
import { Label } from "../../atoms/label";
import { CornerTip } from "../input/corner-tip";
import { MultiInputOption } from "./option";
import {
  MultiInputContext,
  MultiInputContextInterface,
  MultiInputProvider,
  MultiInputProviderProps,
} from "./provider";

export interface MultiInputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "value" | "onChange"> {
  error?: string;
  disabled?: boolean;
  label?: string;
  cornerHint?: string;
  cornerTip?: string;
  helperText?: string;
  undoable?: boolean;
}

export const containerColors: Colors = {
  brand: "focus-within:ring-brand-700",
  secondary: "focus-within:ring-brand-400",
  accent: "focus-within:ring-accent-700",
  success: "focus-within:ring-success-500",
  error: "focus-within:ring-error-500",
  warning: "focus-within:ring-warning-500",
  light: "focus-within:ring-gray-200",
  dark: "focus-within:ring-gray-800",
  none: "",
};

export const Component = <Name extends string>({
  error,
  disabled,
  className,
  label,
  cornerHint,
  cornerTip,
  helperText,
  undoable = true,
  placeholder = "Press ⏎ or ⇥ to add",
  ...rest
}: MultiInputProps) => {
  const {
    state: { showInput, options, inputValue, validationError, removedOptions },
    dispatch,
    name,
    inputRef,
    containerRef,
    color,
    pill,
  } = useContext<MultiInputContextInterface<Name>>(MultiInputContext);

  const handleContainerClick = () => {
    if (!disabled) dispatch({ type: "showInput" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "setInputValue", payload: e.target.value });

  const handleRemoveOption = useCallback(
    (id: string) => dispatch({ type: "removeOption", id }),
    [dispatch]
  );

  const handleBlur = () => dispatch({ type: "hideInput" });

  const classNames = useMemo(
    () =>
      setClasses([
        "group flex h-fit min-h-[36px] ring-1 flex-wrap items-center w-full rounded-md py-1 px-3 text-sm font-light transition-shadow duration-150 ease-in-out shadow-sm gap-2 focus-within:ring-2",
        !error && containerColors[color],
        !error && "ring-gray-200",
        error && containerColors["error"] + " ring-error-500",
        className,
        disabled && "cursor-not-allowed bg-gray-100",
        !disabled && "cursor-text",
      ]),
    [color, className, disabled, error]
  );

  const renderables = useMemo(() => {
    return options.map(({ id, value }) => (
      <MultiInputOption
        key={id}
        pill={pill}
        id={id}
        value={value}
        color={color}
        onClick={handleRemoveOption}
      />
    ));
  }, [options, handleRemoveOption, color, pill]);

  useEffect(() => {
    if (inputRef.current && showInput) {
      inputRef.current.focus();
    }
  }, [inputRef, showInput]);

  const handleUndo = useCallback(() => dispatch({ type: "undo" }), [dispatch]);

  const undoableElement = useMemo(() => {
    if (removedOptions.length > 0 && undoable) {
      return (
        <IconButton
          size="xs"
          color="none"
          onClick={handleUndo}
          tooltip={`Add '${
            removedOptions[removedOptions.length - 1].value
          }' again?`}
          icon={ArrowUturnLeftIcon}
        />
      );
    }
    return null;
  }, [removedOptions, undoable, handleUndo]);

  return (
    <div>
      <Flex
        direction="row"
        align="end"
        justify="between"
        className={
          label || cornerHint || cornerTip || undoableElement ? "mb-1" : ""
        }
      >
        {label && (
          <Label
            htmlFor={rest.id ? rest.id : name}
            className="transition-colors duration-150 ease-in-out group-focus-within:text-gray-900"
          >
            {label}
          </Label>
        )}
        {cornerHint && <InputText variant="cornerHint">{cornerHint}</InputText>}

        {cornerTip && <CornerTip tip={cornerTip} />}
        {undoableElement && undoableElement}
      </Flex>
      <div
        onClick={handleContainerClick}
        ref={containerRef}
        className={classNames}
      >
        {renderables}
        <input
          ref={inputRef}
          onBlur={handleBlur}
          autoFocus
          name={name}
          type="text"
          className={`appearance-none border-none focus:outline-none ${
            showInput ? "inline-block" : "hidden"
          } placeholder:text-gray-900`}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {(error || validationError) && (
        <InputText variant="error" className="mt-2 block">
          {error || validationError}
        </InputText>
      )}
      {helperText && !error && !validationError && (
        <InputText className="mt-2 block">{helperText}</InputText>
      )}
    </div>
  );
};

export const MultiInput = <Name extends string>({
  dispatchKeys,
  onChange,
  value,
  name,
  color = "brand",
  customValidator,
  pill,
  customBadges,
  ...rest
}: MultiInputProps & Omit<MultiInputProviderProps<Name>, "children">) => {
  return (
    <MultiInputProvider
      dispatchKeys={dispatchKeys}
      color={color}
      onChange={onChange}
      value={value}
      name={name}
      pill={pill}
      customBadges={customBadges}
      customValidator={customValidator}
    >
      <Component {...rest} />
    </MultiInputProvider>
  );
};
