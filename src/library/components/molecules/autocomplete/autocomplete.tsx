import { ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Input, InputProps } from "../input";
import { FloatingInputItem } from "../floating/floating-input-item";
import { Placement } from "@floating-ui/react-dom";
import { useRef } from "react";
import { FloatingInputDropdown } from "../floating/floating-input-dropdown";
import {
  InputOption,
  useFloatingInputOptions,
  useFloatingInputOptionsSingleHandlers,
  useFloatingInputOptionsKeyboard,
} from "../../../hooks/use-floating-input-options";

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
  /* selectMode?: "select" | "select-deselect"; */
  isClearable?: boolean;
  placement?: Placement;
  offset?: number;
  renderItems?: (item: InputOption<ValueType>) => React.ReactNode;
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
  isClearable = false,
  offset = 10,
  renderItems,
  ...inputProps
}: AutocompleteProps<ValueType, Name>) => {
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

  const { handleSelect, handleClick, handleClear, selected } =
    useFloatingInputOptionsSingleHandlers({
      ref,
      value,
      name,
      isOpen,
      closeOnSelect,
      selectCloseDelay,
      options,
      onChange: savedOnChange,
      handleClose,
      handleOpen,
    });

  const { cursor } = useFloatingInputOptionsKeyboard(
    options,
    handleSelect,
    ref,
    isOpen
  );

  return (
    <div ref={reference} className="perspective-2xl relative h-fit w-full">
      <Input
        name={name}
        ref={ref}
        placeholder={value ? undefined : placeholder}
        {...inputProps}
        readOnly
        onClick={handleClick}
        defaultValue={selected?.label}
        className="cursor-pointer select-none caret-transparent selection:bg-transparent"
        trailingIcon={
          isClearable && !selected
            ? ChevronUpDownIcon
            : !isClearable
            ? ChevronUpDownIcon
            : undefined
        }
        trailingElement={
          isClearable && selected ? (
            <div
              onClick={handleClear}
              className="flex h-full w-fit cursor-pointer items-center pr-3"
            >
              <XMarkIcon className="h-full w-5" />
            </div>
          ) : undefined
        }
      />

      <FloatingInputDropdown
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
        isOpen={isOpen}
      >
        {window &&
          options.current.map((option, index) => (
            <FloatingInputItem
              color={inputProps.color ? inputProps.color : "brand"}
              key={option.id}
              id={option.id}
              onClick={handleSelect}
              isSelected={selected?.id === option.id}
              isCursor={cursor === index}
              isDisabled={option.disabled}
            >
              {renderItems ? renderItems(option) : option.label}
            </FloatingInputItem>
          ))}
      </FloatingInputDropdown>
    </div>
  );
};
