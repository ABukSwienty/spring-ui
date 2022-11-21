import { State, StateActions } from "./types";
import { isSelected as checkIsSelected } from "./util";

export const reducer = <ValueType extends string | number>(
  state: State<ValueType>,
  action: StateActions<ValueType>
): State<ValueType> => {
  switch (action.type) {
    case "open":
      return { ...state, isOpen: true };

    case "close":
      return { ...state, isOpen: false };

    case "select":
      const selected = state.options.find((option) => option.id === action.id);

      if (!selected) return state;

      const isSelected = checkIsSelected(action.id, state.selectedOptions);

      if (isSelected) return state;

      return {
        ...state,
        selectedOptions: [...state.selectedOptions, selected],
        inputValue: "",
      };

    case "deSelect":
      return {
        ...state,
        selectedOptions: state.selectedOptions.filter(
          (option) => option.id !== action.id
        ),
      };

    case "filter":
      return { ...state, filteredOptions: action.payload };

    case "clear":
      return { ...state, selectedOptions: [] };

    case "onBackspace":
      if (state.inputValue.length > 0) return state;
      return {
        ...state,
        selectedOptions: state.selectedOptions.slice(0, -1),
      };

    case "onExternalValueChange":
      const { selectedOptions } = state;
      const { value } = action;
      // case 1: value is empty, clear selected options
      if (!value || value.length === 0)
        return {
          ...state,
          selectedOptions: [],
        };

      // case 2: value is defined and no selected, find options and set them as selected
      if (selectedOptions.length === 0) {
        const newSelectedOptions = state.options.filter((option) =>
          value.includes(option.value)
        );
        return {
          ...state,
          selectedOptions: newSelectedOptions,
        };
      }

      // case 3: value equals selected options, do nothing
      const values = selectedOptions.map((option) => option.value);
      if (
        values.length === value.length &&
        values.every((v) => value.includes(v))
      ) {
        return state;
      }

      // case 4: value is defined and selected options are different, find options and set them as selected
      const newSelectedOptions = state.options.filter((option) =>
        value.includes(option.value)
      );
      return {
        ...state,
        selectedOptions: newSelectedOptions,
      };

    case "onInputChange":
      return {
        ...state,
        inputValue: action.value,
      };

    default:
      return state;
  }
};
