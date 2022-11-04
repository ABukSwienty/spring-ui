import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input, InputProps } from "../input";
import { FloatingInputItem } from "../floating/floating-input-item";
import { Placement } from "@floating-ui/react-dom";
import { useCallback, useEffect, useRef } from "react";
import { FloatingInputDropdown } from "../floating/floating-input-dropdown";
import {
  InputOption,
  useFloatingInputOptions,
  useFloatingInputOptionsSingleHandlers,
  useFloatingInputOptionsKeyboard,
  useFloatingInputOptionsFilter,
  InternalInputOption,
} from "../../../hooks/use-floating-input-options";
import setClasses from "../../../util/set-classes";
import DefaultNoResults from "./default-no-results";

export interface AutocompleteProps<
  ValueType extends string | number,
  Name extends string
> extends Omit<
    InputProps,
    | "trailingIcon"
    | "trailingAddOn"
    | "trailingInlineAddOn"
    | "trailingElement"
    | "readOnly"
    | "onFocus"
    | "defaultValue"
    | "onChange"
    | "value"
  > {
  name: Name;
  onChange: (value: ValueType | undefined, name: Name) => void;
  value?: ValueType;
  options: InputOption<ValueType>[];
  isOpen?: boolean;
  useClickOutside?: boolean;
  selectCloseDelay?: number;
  closeOnSelect?: boolean;
  dropdownWidth?: React.CSSProperties["width"];
  /* selectMode?: "select" | "select-deselect"; */
  placement?: Placement;
  offset?: number;
  renderItems?: (
    item: InputOption<ValueType>,
    isSelected: boolean,
    isCursor: boolean
  ) => React.ReactNode;
  renderNoResults?: (value: string, handleClose: () => void) => React.ReactNode;
}

export const Autocomplete = <
  ValueType extends string | number,
  Name extends string
>({
  name,
  onChange,
  value,
  placeholder,
  options: optionsProps,
  isOpen: isOpenProp,
  useClickOutside = true,
  selectCloseDelay = 25,
  closeOnSelect = true,
  /* selectMode = "select", */
  placement = "bottom",
  offset = 10,
  renderItems,
  renderNoResults,
  dropdownWidth = "100%",
  className,
  ...inputProps
}: AutocompleteProps<ValueType, Name>) => {
  const classNames = setClasses([className, ""]);
  const ref = useRef<HTMLInputElement>(null);

  const savedOnChange = useRef(onChange);

  const {
    floating: { x, y, strategy, reference, floating },
    options,
    handleOpen,
    handleClose,
    isOpen,
  } = useFloatingInputOptions<ValueType>({
    options: optionsProps,
    isOpen: isOpenProp,
    useClickOutside,
    floating: {
      placement,
      offset,
    },
  });

  const {
    inputValue,
    handleChange,
    filtered,
    setInputValue,
    clearOnChangeFlag,
    setClearOnChangeFlag,
  } = useFloatingInputOptionsFilter({
    options,
  });

  const filteredItemsTotalCount = useRef(filtered.length);
  const filteredItemsCount = filtered.length;

  const { handleSelect, handleClear, selected, onSelect, onClear } =
    useFloatingInputOptionsSingleHandlers({
      value,
      options,
    });

  const { cursor, setCursor } = useFloatingInputOptionsKeyboard(
    { current: filtered },
    handleSelect,
    ref,
    isOpen,
    filteredItemsCount - 1
  );

  // reset cursor
  useEffect(() => {
    if (filteredItemsCount < filteredItemsTotalCount.current) setCursor(0);
  }, [filteredItemsCount, setCursor]);

  // handles select / clear
  const handleSelectedChange = useCallback(
    (option: InternalInputOption<ValueType> | undefined) => {
      savedOnChange.current(option ? option.value : undefined, name);
      if (!option) return;
      setClearOnChangeFlag(true);
      setInputValue(option.label);
      if (closeOnSelect) {
        setTimeout(() => {
          handleClose();
        }, selectCloseDelay);
      }
    },
    [
      closeOnSelect,
      handleClose,
      name,
      selectCloseDelay,
      setInputValue,
      setClearOnChangeFlag,
    ]
  );

  // handles clear after a select but maintains the input value
  const handleClearOnChangeFlag = useCallback(() => {
    savedOnChange.current(undefined, name);
    setClearOnChangeFlag(false);
    handleOpen();
  }, [name, setClearOnChangeFlag, handleOpen]);

  // handles opening and closing on click
  const handleClick = useCallback(() => {
    if (!isOpen) {
      handleOpen();
      return;
    }

    handleClose();

    if (ref.current) {
      ref.current.blur();
    }
  }, [handleClose, handleOpen, isOpen]);

  // handles subscriptions
  useEffect(() => {
    const selectOff = onSelect(handleSelectedChange);
    const clearOff = onClear(handleSelectedChange);
    const clearOnChangeOff = onClear(handleClearOnChangeFlag);
    return () => {
      selectOff();
      clearOff();
      clearOnChangeOff();
    };
  }, [handleClearOnChangeFlag, handleSelectedChange, onClear, onSelect]);

  // handles clearing the selected after a select and new input value
  useEffect(() => {
    if (clearOnChangeFlag && selected?.label !== inputValue) {
      handleClear();
    }
  }, [clearOnChangeFlag, selected, handleClear, inputValue]);

  const noResults = filtered.length === 0;

  return (
    <div ref={reference} className="perspective-2xl relative h-fit w-full">
      <Input
        name={name}
        ref={ref}
        placeholder={value ? undefined : placeholder}
        {...inputProps}
        onClick={handleClick}
        value={inputValue}
        onChange={handleChange}
        className={classNames}
      />

      <FloatingInputDropdown
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
        width={dropdownWidth}
        isOpen={isOpen}
      >
        {noResults &&
          renderNoResults &&
          renderNoResults(inputValue, handleClose)}
        {noResults && !renderNoResults && (
          <DefaultNoResults value={inputValue} color={inputProps?.color} />
        )}
        {window &&
          !noResults &&
          filtered.map((option, index) => (
            <FloatingInputItem
              color={inputProps?.color}
              key={option.id}
              id={option.id}
              onClick={handleSelect}
              isSelected={selected?.id === option.id}
              isCursor={cursor === index}
              isDisabled={option.disabled}
            >
              {renderItems
                ? renderItems(
                    option,
                    selected?.id === option.id,
                    cursor === index
                  )
                : option.label}
            </FloatingInputItem>
          ))}
      </FloatingInputDropdown>
    </div>
  );
};
