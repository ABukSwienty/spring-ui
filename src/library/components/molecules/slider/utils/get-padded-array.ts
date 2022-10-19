/**
 * Adds padding to an array.
 *
 * @example
 *
 * // odd array
 * getPaddedArray([1, 2, 3])
 * // {
 * //   paddingLeft: 1,
 * //   paddingRight: 2,
 * //   array: [1,1,2,3,2,3],
 * // }
 *
 * // even array
 * getPaddedArray([1, 2, 3, 4])
 * // {
 * //   paddingLeft: 2,
 * //   paddingRight: 2,
 * //   array: [1,2,1,2,3,4,3,4],
 * // }
 *
 * @param array Array
 * @returns Object with padded array and left and right paddings
 */
const getPaddedArray = <T>(array: T[]) => {
  // if even / odd
  if (array.length % 2 === 0) {
    const paddingLeft = array.length / 2;
    const paddingRight = paddingLeft;
    return {
      paddingLeft,
      paddingRight,
      array: [
        ...array.slice(0, paddingLeft),
        ...array,
        ...array.slice(paddingRight, array.length),
      ],
    };
  } else {
    const paddingLeft = Math.floor(array.length * 0.6);
    const paddingRight = array.length - paddingLeft;

    return {
      paddingLeft,
      paddingRight,
      array: [
        ...array.slice(0, paddingLeft),
        ...array,
        ...array.slice(paddingLeft, array.length),
      ],
    };
  }
};

export default getPaddedArray;
