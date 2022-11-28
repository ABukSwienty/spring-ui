import { v4 as uuidv4 } from "uuid";
import { uniqueOnly } from "./util";

export type InternalOption = { id: string; value: string };

export interface State {
  inputValue: string;
  showInput: boolean;
  options: InternalOption[];
  validationError: string | undefined;
  removedOptions: InternalOption[];
}

export type StateActions =
  | {
      type: "setInputValue";
      payload: string;
    }
  | { type: "showInput" }
  | { type: "hideInput" }
  | {
      type: "addOption";
      payload: {
        value: string;
        validator: undefined | ((value: string) => string | undefined);
      };
    }
  | { type: "removeOption"; id: string }
  | { type: "popOption" }
  | { type: "setError"; payload: string | undefined }
  | { type: "undo" };

export const reducer = (state: State, action: StateActions) => {
  switch (action.type) {
    case "setInputValue":
      return {
        ...state,
        inputValue: action.payload,
        validationError: undefined,
      };

    case "showInput":
      return { ...state, showInput: true };

    case "hideInput":
      return { ...state, showInput: false };

    case "addOption":
      if (state.options.find((option) => option.value === action.payload.value))
        return { ...state, validationError: "You've already added that!" };

      if (action.payload.validator) {
        const validationError = action.payload.validator(action.payload.value);
        if (validationError && validationError.length > 0)
          return { ...state, validationError };
      }

      return {
        ...state,
        options: [
          ...state.options,
          { id: uuidv4(), value: action.payload.value },
        ],
        inputValue: "",
        validationError: undefined,
        removedOptions: state.removedOptions.find(
          (option) => option.value === action.payload.value
        )
          ? state.removedOptions.filter(
              (option) => option.value !== action.payload.value
            )
          : state.removedOptions,
      };

    case "removeOption":
      const optionToRemove = state.options.find(
        (option) => option.id === action.id
      );
      return {
        ...state,
        options: state.options.filter((option) => option.id !== action.id),
        removedOptions: optionToRemove
          ? uniqueOnly(state.removedOptions, optionToRemove)
          : state.removedOptions,
      };

    case "popOption":
      const copy = [...state.options];
      const poppedOption = copy.pop();
      return {
        ...state,
        options: state.options.slice(0, -1),
        removedOptions: poppedOption
          ? uniqueOnly(state.removedOptions, poppedOption)
          : state.removedOptions,
      };

    case "undo":
      const removedCopy = [...state.removedOptions];
      const poppedRemovedOption = removedCopy.pop();
      if (!poppedRemovedOption)
        return { ...state, removedOptions: [...removedCopy], showInput: true };
      return {
        ...state,
        options: [...state.options, poppedRemovedOption],
        removedOptions: [...removedCopy],
        showInput: true,
      };

    default:
      return state;
  }
};
