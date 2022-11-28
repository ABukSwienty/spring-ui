import React, { useEffect, useReducer, useRef, useState } from "react";
import { Colors } from "../../../types/colors";
import { DateUtils } from "./utils";

type Mode = "month" | "year" | "decade";

export interface DatePickerContextInterface {
  mode: Mode;
  setMode: (mode: Mode) => void;
  selections: SelectionsState;
  dispatchSelections: (action: SelectionsAction) => void;
  displayValue: Date;
  setDisplayValue: (value: Date) => void;
  name: string;
  color: keyof Colors;
}

export const DatePickerContext =
  React.createContext<DatePickerContextInterface>(undefined!);

interface SelectionsState {
  day: number;
  month: number;
  year: number;
  decade: { start: number; end: number };
}

export type SelectionsAction =
  | {
      type: "decade";
      value: { start: number; end: number };
    }
  | {
      type: "today";
    }
  | {
      type: "month" | "year" | "day";
      value: number;
    }
  | {
      type: "fromValue";
      value: Date;
    };

const selectionsReducer = (
  state: SelectionsState,
  action: SelectionsAction
) => {
  switch (action.type) {
    case "decade":
      return { ...state, decade: action.value };

    case "year":
      return { ...state, year: action.value };

    case "month":
      return { ...state, month: action.value };

    case "day":
      return { ...state, day: action.value };

    case "today":
      return {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        decade: DateUtils.getDecadesFromYear(new Date().getFullYear()),
      };

    case "fromValue":
      const { year, month, day } = state;
      const dayFromValue = action.value.getDate();
      const monthFromValue = action.value.getMonth();
      const yearFromValue = action.value.getFullYear();

      if (
        dayFromValue !== day ||
        monthFromValue !== month ||
        yearFromValue !== year
      ) {
        return {
          day: dayFromValue,
          month: monthFromValue,
          year: yearFromValue,
          decade: DateUtils.getDecadesFromYear(action.value.getFullYear()),
        };
      }

      return state;
  }
};

const { getDecadesFromYear } = DateUtils;

export interface DatePickerProviderProps {
  children: React.ReactNode;
  value: Date;
  onChange: (name: string, value: Date) => void;
  name: string;
  color?: keyof Colors;
}

const DatePickerProvider = ({
  children,
  value,
  onChange,
  name,
  color = "brand",
}: DatePickerProviderProps) => {
  const savedOnChange = useRef(onChange);
  const [displayValue, setDisplayValue] = useState(value ?? new Date());

  const [mode, setMode] = useState<Mode>("month");
  const [selections, dispatchSelections] = useReducer(selectionsReducer, {
    day: displayValue.getDate(),
    month: displayValue.getMonth(),
    year: displayValue.getFullYear(),
    decade: getDecadesFromYear(displayValue.getFullYear()),
  });

  useEffect(() => {
    const newDate = new Date(selections.year, selections.month, selections.day);
    setDisplayValue(newDate);
    savedOnChange.current(name, newDate);
  }, [selections, name]);

  const valueDay = value?.getDate();
  const valueMonth = value?.getMonth();
  const valueYear = value?.getFullYear();

  // handle value change dynamically
  useEffect(() => {
    dispatchSelections({
      type: "fromValue",
      value: new Date(valueYear, valueMonth, valueDay),
    });
  }, [valueDay, valueMonth, valueYear]);

  return (
    <DatePickerContext.Provider
      value={{
        mode,
        setMode,
        selections,
        dispatchSelections,
        displayValue,
        setDisplayValue,
        name,
        color,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export default DatePickerProvider;
