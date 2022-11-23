import { useCallback, useContext, useEffect, useState } from "react";
import Item from "./item";
import Nav from "./nav";
import { DatePickerContext } from "./provider";

const monthsArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface CalenderProps {}

const Year = () => {
  const { setMode, selections, dispatchSelections, color } =
    useContext(DatePickerContext);
  const [year, setYear] = useState(selections.year);

  const display = new Date(year, 0).toLocaleString("default", {
    year: "numeric",
  });

  useEffect(() => {
    dispatchSelections({ type: "year", value: year });
  }, [dispatchSelections, year]);

  const handleClick = useCallback(
    (month: number) => {
      dispatchSelections({ type: "month", value: month });
      setMode("month");
    },
    [dispatchSelections, setMode]
  );

  const handleNavLeft = useCallback(() => setYear((prev) => prev + -1), []);
  const handleNavRight = useCallback(() => setYear((prev) => prev + 1), []);

  const handleMode = useCallback(() => setMode("decade"), [setMode]);

  return (
    <>
      <Nav
        navLeft={handleNavLeft}
        navRight={handleNavRight}
        display={display}
        handleMode={handleMode}
      />
      <div className="grid w-full grow grid-cols-4 grid-rows-3 gap-1">
        {monthsArr.map((month, index) => (
          <Item
            color={color}
            onClick={() => handleClick(index)}
            isActive={selections.month === index ? true : false}
            size="month"
            key={index}
          >
            {month}
          </Item>
        ))}
      </div>
    </>
  );
};

export default Year;
