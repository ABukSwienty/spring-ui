export const DateUtils = {
  /**
   * Will get the nearest decades of a year.
   * @param year number
   *
   * @example
   * getDecadesFromYear(1965) -> { start: 1960, end: 1969 }
   *
   * @return Object {start: number, end: number}
   */
  getDecadesFromYear: function (year: number): { start: number; end: number } {
    if (
      Number.isNaN(year) ||
      year.toString().length < 4 ||
      year.toString().length > 4
    ) {
      throw new Error("Date must be valid and have a 4-digit year attribute");
    }
    let start = Number(`${year.toString()[2]}0`);
    let startIdx = year.toString().substring(0, 2);
    let end = 0;
    start =
      start === 0 ? Number(`${startIdx}00`) : Number(`${startIdx}${start}`);
    end = start + 9;
    return { start: start, end: end };
  },

  /**
   * Will get total number of days in a month.
   * @param year number
   * @param month number
   * @returns number
   */
  getDaysInMonth: (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate(),

  /**
   * Will get the first day of a month.
   * @param year number
   * @param month number
   * @returns number
   */
  getFirstDayofMonth: (year: number, month: number) =>
    new Date(year, month, 1).getDay(),

  /**
   * Will attempt to parse date string into a Date object. Returns true if successful, false if not.
   * @param dateString string
   * @returns boolean
   */
  isDate: (dateString: string) => !isNaN(Date.parse(dateString)),
};
