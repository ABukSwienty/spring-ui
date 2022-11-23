import { useCallback, useContext, useEffect, useReducer } from "react";
import Item from "./item";
import Nav from "./nav";
import { DatePickerContext } from "./provider";
import { DateUtils } from "./utils";

interface data {
  month: number;
  year: number;
}

const daysArr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const dataReducer = (state: data, action: "increase" | "decrease") => {
  switch (action) {
    case "increase":
      const newMonth = state.month + 1;
      if (newMonth > 11) return { month: 0, year: state.year + 1 };
      return { ...state, month: newMonth };
    case "decrease":
      const newMonth2 = state.month - 1;
      if (newMonth2 < 0) return { month: 11, year: state.year - 1 };
      return { ...state, month: newMonth2 };
  }
};

export interface CalenderProps {
  handleHide: () => void;
}

const { getDaysInMonth, getFirstDayofMonth } = DateUtils;

const Month = ({ handleHide }: CalenderProps) => {
  const { setMode, selections, dispatchSelections, color } =
    useContext(DatePickerContext);

  const [data, dispatchData] = useReducer(dataReducer, {
    month: selections.month,
    year: selections.year,
  });

  useEffect(() => {
    dispatchSelections({ type: "month", value: data.month });
  }, [data.month, dispatchSelections]);

  useEffect(() => {
    dispatchSelections({ type: "year", value: data.year });
  }, [data.year, dispatchSelections]);

  const currentMonth = Array.from({
    length: getDaysInMonth(data.year, data.month),
  });

  const previousMonth = Array.from({
    length: getFirstDayofMonth(data.year, data.month),
  });

  const nextMonth = Array.from({
    length: 42 - (previousMonth.length + currentMonth.length),
  });

  const display = new Date(data.year, data.month).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const handleClick = (day: number) => {
    dispatchSelections({ type: "day", value: day });
    handleHide();
  };

  const handleNavLeft = useCallback(() => dispatchData("decrease"), []);
  const handleNavRight = useCallback(() => dispatchData("increase"), []);

  const handleMode = useCallback(() => setMode("year"), [setMode]);

  return (
    <>
      <Nav
        navLeft={handleNavLeft}
        navRight={handleNavRight}
        display={display}
        handleMode={handleMode}
      />
      <div className="grid w-full grid-cols-7 grid-rows-1">
        {daysArr.map((day, index) => (
          <Item color={color} isHoverable={false} isCurrent={false} key={index}>
            {day}
          </Item>
        ))}
      </div>
      <div className="grid w-full grow grid-cols-7 grid-rows-6">
        {previousMonth.map((_, index) => (
          <Item color={color} isCurrent={false} isHoverable={false} key={index}>
            {index + 1}
          </Item>
        ))}
        {currentMonth.map((_, index) => (
          <Item
            color={color}
            onClick={() => handleClick(index + 1)}
            key={index}
            isActive={selections.day === index + 1 ? true : false}
          >
            {index + 1}
          </Item>
        ))}
        {nextMonth.map((_, index) => (
          <Item color={color} isCurrent={false} isHoverable={false} key={index}>
            {index + 1}
          </Item>
        ))}
      </div>
    </>
  );
};

export default Month;
