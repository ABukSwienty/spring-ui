/**
 * Takes a range of an array and returns the items in that range. Always returns the amount of items specified in take.
 *
 * @example
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const range = getRange(0,3, array); // [1, 2, 3]
 * const secondRange = getRange(3, 3, array); // [4, 5, 6]
 * const thirdRange = getRange(9, 3, array); // [8,9,10]
 *
 * @param start number
 * @param take number
 * @param array Array
 * @returns Array
 */
export const getRange = (start: number, take: number, array: any[]) => {
  if (start === 0 || start < 0) return [...array].slice(0, take);

  const exceedsRange = start - 1 + take > array.length;
  if (exceedsRange) return [...array].slice(array.length - take, array.length);

  return [...array].slice(start - 1, start - 1 + take);
};
