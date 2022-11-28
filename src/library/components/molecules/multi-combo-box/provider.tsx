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

export interface MultiComboBoxContextInterface<
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
  customBadges: React.MutableRefObject<
    | ((
        option: InternalInputOption<ValueType>,
        handleDeselect: () => void
      ) => React.ReactNode)
    | undefined
  >;
  pill: boolean;
}

export const MultiComboBoxContext = createContext<
  MultiComboBoxContextInterface<any, any>
>(undefined!);

export interface MultiComboBoxProviderProps<
  ValueType extends string | number,
  Name extends string
> {
  children?: React.ReactNode;
  options: InputOption<ValueType>[];
  name: Name;
  color?: keyof Colors;
  placement?: Placement;
  offset?: number;
  onChange: (value: ValueType[], name: Name) => void;
  value?: ValueType[];
  customOptions?: (
    option: InternalInputOption<ValueType>,
    isSelected: boolean,
    isCursor: boolean
  ) => React.ReactNode;
  customBadges?: (
    option: InternalInputOption<ValueType>,
    handleDeselect: () => void
  ) => React.ReactNode;
  customFilter?: <ValueType extends string | number>(
    options: InternalInputOption<ValueType>[],
    value: string
  ) => InternalInputOption<ValueType>[];
  customNoResults?: (value: string, handleClose: () => void) => React.ReactNode;
  pill?: boolean;
}

export const MultiComboBoxProvider = <
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
  customBadges,
  pill = false,
}: MultiComboBoxProviderProps<ValueType, Name>) => {
  // saved refs
  const internalOptions = useRef(createInternalOptions(options));
  const inputRef = useRef<HTMLInputElement>(null);
  const savedOnChange = useRef(onChange);
  const savedCustomOptions = useRef(customOptions);
  const savedCustomFilter = useRef(customFilter);
  const savedCustomNoResults = useRef(customNoResults);
  const savedCustomBadges = useRef(customBadges);

  const firstMount = useRef(true);

  // to avoid infinite re-renders on handle external options value
  const externalValueToString = JSON.stringify(value);

  const [state, dispatch] = useReducer<
    React.Reducer<State<ValueType>, StateActions<ValueType>>
  >(
    reducer,
    {
      isOpen: false,
      selectedOptions: [],
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

  // handle external options value
  useEffect(() => {
    if (firstMount.current) return;
    const externalValue = JSON.parse(externalValueToString) as ValueType[];
    dispatch({
      type: "onExternalValueChange",
      value: externalValue,
    });
  }, [externalValueToString]);

  // handle onChange
  useEffect(() => {
    if (firstMount.current) return;
    savedOnChange.current(
      state.selectedOptions.map((option) => option.value),
      name
    );
    floating.update();
  }, [state.selectedOptions, name, floating]);

  // handle first mount to avoid infinite re-renders
  useEffect(() => {
    if (!firstMount.current) return;
    firstMount.current = false;
    const externalValue = JSON.parse(externalValueToString) as ValueType[];
    dispatch({
      type: "onExternalValueChange",
      value: externalValue,
    });
    // should be called only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MultiComboBoxContext.Provider
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
        customBadges: savedCustomBadges,
        pill,
      }}
    >
      {children}
    </MultiComboBoxContext.Provider>
  );
};
