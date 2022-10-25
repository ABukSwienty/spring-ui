/**
 * Wraps an array in a given direction.
 *
 * @example
 * wrapArray([1, 2, 3], "left") // [3, 1, 2]
 * wrapArray([1, 2, 3], "right") // [2, 3, 1]
 *
 * @param array Array to wrap
 * @param direction relative direction to wrap - default is "right"
 * @returns Array wrapped in the given direction
 */
const wrapArray = <T>(array: T[], direction: "right" | "left" = "right") => {
  switch (direction) {
    case "right":
      return [...array, ...array.slice(0, 1)].slice(-array.length);

    case "left":
      return [...array.slice(-1), ...array].slice(0, array.length);

    default:
      return array;
  }
};

export default wrapArray;
