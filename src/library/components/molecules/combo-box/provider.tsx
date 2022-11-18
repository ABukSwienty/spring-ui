import {
  createContext,
  RefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { InputOption, InternalInputOption, State, StateActions } from "./types";
import { createInternalOptions } from "./util";
import { SpringColors } from "../../../types/spring-colors";
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
  color: keyof SpringColors;
  name: Name;
  state: State<ValueType>;
  dispatch: React.Dispatch<StateActions<ValueType>>;
  customOptions: React.MutableRefObject<
    ((option: InternalInputOption<ValueType>) => React.ReactNode) | undefined
  >;
  customFilter: React.MutableRefObject<
    | (<ValueType extends string | number>(
        options: InternalInputOption<ValueType>[],
        value: string
      ) => InternalInputOption<ValueType>[])
    | undefined
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
  color?: keyof SpringColors;
  placement?: Placement;
  offset?: number;
  onChange: (value: ValueType | undefined, name: Name) => void;
  value?: ValueType;
  customOptions?: (option: InternalInputOption<ValueType>) => React.ReactNode;
  customFilter?: <ValueType extends string | number>(
    options: InternalInputOption<ValueType>[],
    value: string
  ) => InternalInputOption<ValueType>[];
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
}: ComboBoxProviderProps<ValueType, Name>) => {
  // saved refs
  const internalOptions = useRef(createInternalOptions(options));
  const inputRef = useRef<HTMLInputElement>(null);
  const savedOnChange = useRef(onChange);
  const savedCustomOptions = useRef(customOptions);
  const savedCustomFilter = useRef(customFilter);

  const [state, dispatch] = useReducer<
    React.Reducer<State<ValueType>, StateActions<ValueType>>
  >(
    reducer,
    {
      isOpen: false,
      selectedOption: internalOptions.current.find(
        (option) => option.value === value
      ),
      filteredOptions: internalOptions.current,
      options: internalOptions.current,
      inputValue: "",
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
  useEffect(
    () => savedOnChange.current(state.selectedOption?.value, name),
    [state.selectedOption, name]
  );

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
      }}
    >
      {children}
    </ComboBoxContext.Provider>
  );
};
