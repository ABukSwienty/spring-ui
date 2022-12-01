import {
  createContext,
  RefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";

import {
  InputOption,
  InternalInputOption,
  SelectMode,
  State,
  StateActions,
} from "./types";
import { createInternalOptions } from "./util";
import { Colors } from "../../../types/colors";
import {
  flip,
  offset,
  Placement,
  shift,
  useFloating,
} from "@floating-ui/react-dom";
import useOnClickOutside from "../../../hooks/use-on-click-outside";

import { reducer } from "./reducer";

export interface ComboBoxContextInterface<
  ValueType extends string | number,
  Name extends string
> {
  inputRef: React.RefObject<HTMLInputElement>;
  floating: ReturnType<typeof useFloating>;
  color: keyof Colors;
  name: Name;
  state: State<ValueType>;
  dispatch: React.Dispatch<StateActions<ValueType>>;
  customOptions: React.MutableRefObject<
    | ((
        option: InternalInputOption<ValueType>,
        isSelected: boolean,
        isCursor: boolean
      ) => React.ReactNode)
    | undefined
  >;
  customFilter: React.MutableRefObject<
    | (<ValueType extends string | number>(
        options: InternalInputOption<ValueType>[],
        value: string
      ) => InternalInputOption<ValueType>[])
    | undefined
  >;
  customNoResults: React.MutableRefObject<
    ((value: string, handleClose: () => void) => React.ReactNode) | undefined
  >;
}

export const ComboBoxContext = createContext<
  ComboBoxContextInterface<any, any>
>(undefined!);

export interface ComboBoxProviderProps<
  ValueType extends string | number,
  Name extends string
> {
  children?: React.ReactNode;
  options: InputOption<ValueType>[];
  name: Name;
  color?: keyof Colors;
  placement?: Placement;
  offset?: number;
  onChange: (name: Name, value: ValueType | undefined) => void;
  value?: ValueType;
  customOptions?: (
    option: InternalInputOption<ValueType>,
    isSelected: boolean,
    isCursor: boolean
  ) => React.ReactNode;
  customFilter?: <ValueType extends string | number>(
    options: InternalInputOption<ValueType>[],
    value: string
  ) => InternalInputOption<ValueType>[];
  customNoResults?: (value: string, handleClose: () => void) => React.ReactNode;
  selectMode?: SelectMode;
}

export const ComboBoxProvider = <
  ValueType extends string | number,
  Name extends string
>({
  children,
  options,
  name,
  color = "brand",
  placement = "bottom",
  offset: offsetProps = 10,
  onChange,
  value,
  customOptions,
  customFilter,
  customNoResults,
  selectMode = "select",
}: ComboBoxProviderProps<ValueType, Name>) => {
  // saved refs
  const internalOptions = useRef(createInternalOptions(options));
  const inputRef = useRef<HTMLInputElement>(null);
  const savedOnChange = useRef(onChange);
  const savedCustomOptions = useRef(customOptions);
  const savedCustomFilter = useRef(customFilter);
  const savedCustomNoResults = useRef(customNoResults);

  const [state, dispatch] = useReducer<
    React.Reducer<State<ValueType>, StateActions<ValueType>>
  >(
    reducer,
    {
      isOpen: false,
      selectedOption: value
        ? internalOptions.current.find((option) => option.value === value)
        : undefined,
      filteredOptions: internalOptions.current,
      options: internalOptions.current,
      inputValue: "",
      selectMode,
    },
    undefined
  );

  const floating = useFloating({
    strategy: "absolute",
    placement,
    middleware: [offset(offsetProps), flip(), shift()],
  });

  const handleClickOutside = useCallback(() => dispatch({ type: "close" }), []);

  // close on click outside
  useOnClickOutside(
    floating.refs.reference as RefObject<HTMLElement>,
    handleClickOutside
  );

  // handle onChange
  useEffect(() => {
    savedOnChange.current(name, state.selectedOption?.value);
  }, [state.selectedOption, name]);

  // handle external options value
  useEffect(() => {
    dispatch({
      type: "onExternalValueChange",
      value,
    });
  }, [value]);

  return (
    <ComboBoxContext.Provider
      value={{
        inputRef,
        floating,
        color,
        name,
        state,
        dispatch,
        customFilter: savedCustomFilter,
        customOptions: savedCustomOptions,
        customNoResults: savedCustomNoResults,
      }}
    >
      {children}
    </ComboBoxContext.Provider>
  );
};
