import { State, StateActions } from "./types";

export const reducer = <ValueType extends string | number>(
  state: State<ValueType>,
  action: StateActions<ValueType>
): State<ValueType> => {
  const { selectMode } = state;
  switch (action.type) {
    case "open":
      return { ...state, isOpen: true };

    case "close":
      return { ...state, isOpen: false };

    case "select":
      const selected = state.options.find((option) => option.id === action.id);

      if (selectMode === "select-deselect") {
        if (state.selectedOption?.id === action.id) {
          return {
            ...state,
            isOpen: false,
            selectedOption: undefined,
            inputValue: "",
          };
        }
      }

      return {
        ...state,
        isOpen: false,
        selectedOption: selected,
        inputValue: selected?.label || "",
      };

    case "filter":
      return { ...state, filteredOptions: action.payload };

    case "clear":
      return { ...state, selectedOption: undefined };

    case "onExternalValueChange":
      const { selectedOption } = state;
      const { value } = action;
      // case 1: value is undefined, clear the selected option
      if (!value) {
        if (!selectedOption) return state;
        return { ...state, selectedOption: undefined };
      }

      // case 2: value is defined, find the option with the same value and set it as selected
      if (value !== selectedOption?.value) {
        const newSelectedOption = state.options.find(
          (option) => option.value === value
        );
        return {
          ...state,
          selectedOption: newSelectedOption,
          inputValue: newSelectedOption?.label || "",
        };
      }

      // case 3: value equals the selected option value, do nothing
      if (value === selectedOption?.value) return state;

      return state;

    case "onInputChange":
      if (!state.selectedOption) return { ...state, inputValue: action.value };
      if (state.selectedOption.label !== action.value)
        return {
          ...state,
          inputValue: action.value,
          selectedOption: undefined,
        };

      return state;

    default:
      return state;
  }
};
