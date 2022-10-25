/**
 * Extends an array x amount of times.
 *
 * @example
 * extendArray([1, 2, 3], 2) // [1, 2, 3, 1, 2, 3]
 *
 * @param array array to extend
 * @param amount the amount of times to extend the array. Defaults to 2.
 * @returns a new array with the original array extended by the amount
 */
const extendArray = <T>(array: T[], amount: number = 2) => {
  const copy = [];
  for (let padding = 0; padding < amount; padding++) {
    copy.push(...array);
  }
  return copy;
};

export default extendArray;
