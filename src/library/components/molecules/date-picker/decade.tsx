import { useCallback, useContext, useEffect, useState } from "react";
import Item from "./item";
import Nav from "./nav";
import { DatePickerContext } from "./provider";
import { DateUtils } from "./utils";

export interface CalenderProps {}

const { getDecadesFromYear } = DateUtils;

const DecadeItem = ({
  yearStart,
  index,
  selectionsYear,
  onClick,
}: {
  yearStart: number;
  index: number;
  selectionsYear: number;
  onClick: (year: number) => void;
}) => {
  const { color } = useContext(DatePickerContext);

  const handleClick = useCallback(
    () => onClick(yearStart + index),
    [index, onClick, yearStart]
  );

  return (
    <Item
      color={color}
      onClick={handleClick}
      isActive={selectionsYear === yearStart + index ? true : false}
      size="year"
      key={index}
    >
      {yearStart + index}
    </Item>
  );
};

const Decade = () => {
  const { setMode, selections, dispatchSelections } =
    useContext(DatePickerContext);
  const [year, setYear] = useState(selections.decade);

  useEffect(() => {
    dispatchSelections({ type: "decade", value: year });
  }, [dispatchSelections, year]);

  const handleClick = useCallback(
    (year: number) => {
      dispatchSelections({ type: "year", value: year });
      setMode("year");
    },
    [dispatchSelections, setMode]
  );

  const handleNavLeft = useCallback(
    () => setYear((prev) => getDecadesFromYear(prev.start - 1)),
    []
  );

  const handleNavRight = useCallback(
    () => setYear((prev) => getDecadesFromYear(prev.end + 1)),
    []
  );

  const handleMode = useCallback(() => setMode("month"), [setMode]);

  return (
    <>
      <Nav
        navLeft={handleNavLeft}
        navRight={handleNavRight}
        display={`${selections.decade.start}-${selections.decade.end}`}
        handleMode={handleMode}
      />
      <div className="grid w-full grow grid-cols-5 grid-rows-2 gap-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <DecadeItem
            key={index}
            yearStart={year.start}
            index={index}
            selectionsYear={selections.year}
            onClick={handleClick}
          />
        ))}
      </div>
    </>
  );
};

export default Decade;
