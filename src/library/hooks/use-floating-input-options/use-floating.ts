import {
  useFloating,
  offset,
  flip,
  shift,
  Placement,
  Strategy,
} from "@floating-ui/react-dom";
import { useState, useCallback, RefObject, useRef } from "react";
import useOnClickOutside from "../use-on-click-outside";
import { InputOption, InternalInputOption } from "./types";
import { v4 as uuidv4 } from "uuid";

export interface UseFloatingInputOptions<ValueType> {
  options: InputOption<ValueType>[];
  floating?: {
    strategy?: Strategy;
    placement?: Placement;
    offset?: number;
  };
  isOpen?: boolean;
  useClickOutside?: boolean;
}

/**
 * Handles the floating aspect of the input options as well as the open/close
 */
export const useFloatingInputOptions = <ValueType>({
  options: optionsProps,
  floating: {
    strategy = "absolute",
    placement = "bottom-start",
    offset: offsetProps = 10,
  } = {},
  isOpen: isOpenProps = false,
  useClickOutside = true,
}: UseFloatingInputOptions<ValueType>) => {
  const floating = useFloating({
    strategy,
    placement,
    middleware: [offset(offsetProps), flip(), shift()],
  });

  const [isOpen, setIsOpen] = useState(isOpenProps);

  const options = useRef<InternalInputOption<ValueType>[]>(
    optionsProps.map((option) => ({
      ...option,
      label: option.label || `${option.value}`,
      id: uuidv4(),
    }))
  );

  const handleOpen = useCallback(() => setIsOpen(true), []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const getOption = useCallback(
    (id: string) => {
      if (!options) return;
      return options.current.find((option) => option.id === id);
    },
    [options]
  );

  useOnClickOutside(
    useClickOutside
      ? (floating.refs.reference as RefObject<HTMLElement>)
      : { current: null },
    handleClose
  );

  return {
    options,
    floating,
    isOpen,
    handleOpen,
    handleClose,
    getOption,
  };
};
