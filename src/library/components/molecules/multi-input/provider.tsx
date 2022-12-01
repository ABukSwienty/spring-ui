import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { InternalOption, reducer, State, StateActions } from "./reducer";
import { v4 as uuidv4 } from "uuid";
import useEventListener from "../../../hooks/use-event-listener";
import { containerColors } from ".";

export interface MultiInputContextInterface<Name extends string> {
  name: Name;
  state: State;
  dispatch: React.Dispatch<StateActions>;
  inputRef: React.RefObject<HTMLInputElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  color: keyof typeof containerColors;
  pill: boolean;
  customBadges: React.MutableRefObject<
    | ((option: InternalOption, handleDeselect: () => void) => React.ReactNode)
    | undefined
  >;
}

export const MultiInputContext = createContext<MultiInputContextInterface<any>>(
  undefined!
);

export type CustomValidator = (value: string) => string | undefined;

export interface MultiInputProviderProps<Name extends string> {
  children: React.ReactNode;
  value?: string[];
  name: Name;
  onChange: (name: Name, value: string[]) => void;
  dispatchKeys?: Array<Omit<KeyboardEvent["key"], "Backspace">>;
  color?: keyof typeof containerColors;
  customValidator?: CustomValidator;
  pill?: boolean;
  customBadges?: (
    option: InternalOption,
    handleDeselect: () => void
  ) => React.ReactNode;
}

export const MultiInputProvider = <Name extends string>({
  name,
  onChange,
  value,
  dispatchKeys,
  children,
  color = "brand",
  customValidator,
  pill = false,
  customBadges,
}: MultiInputProviderProps<Name>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const savedDispatchKeys = useRef(dispatchKeys || ["Enter", "Tab"]);
  const savedOnChange = useRef(onChange);
  const savedCustomValidator = useRef(customValidator);
  const savedCustomBadges = useRef(customBadges);

  const [state, dispatch] = useReducer<React.Reducer<State, StateActions>>(
    reducer,
    {
      inputValue: "",
      showInput: false,
      options: value ? value.map((v) => ({ id: uuidv4(), value: v })) : [],
      validationError: undefined,
      removedOptions: [],
    }
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;

    if (e.key === "Backspace" && !target.value) {
      e.preventDefault();
      dispatch({ type: "popOption" });
    }

    if (savedDispatchKeys.current.includes(e.key)) {
      e.preventDefault();
      if (target.value)
        dispatch({
          type: "addOption",
          payload: {
            value: target.value,
            validator: savedCustomValidator.current,
          },
        });
    }
  }, []);

  useEventListener("keydown", handleKeyDown, inputRef);

  // handle external onChange
  useEffect(() => {
    savedOnChange.current(
      name,
      state.options.map((option) => option.value)
    );
  }, [state.options, name]);

  return (
    <MultiInputContext.Provider
      value={{
        name,
        state,
        dispatch,
        inputRef,
        containerRef,
        color,
        pill,
        customBadges: savedCustomBadges,
      }}
    >
      {children}
    </MultiInputContext.Provider>
  );
};
