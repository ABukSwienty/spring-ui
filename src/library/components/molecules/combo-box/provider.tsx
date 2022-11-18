import {
  createContext,
  RefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { InputOption, State, StateActions } from "./types";
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
}: ComboBoxProviderProps<ValueType, Name>) => {
  // saved refs
  const internalOptions = useRef(createInternalOptions(options));
  const inputRef = useRef<HTMLInputElement>(null);
  const savedOnChange = useRef(onChange);

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
      }}
    >
      {children}
    </ComboBoxContext.Provider>
  );
};
