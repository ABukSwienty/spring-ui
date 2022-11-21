/**
 * Does a shallow comparison and pushes a value to an array if it is not already present.
 *
 * @example
 * const arr = [1, 2, 3];
 * pushUnique(arr, [1,2,3,4]); // arr = [1, 2, 3, 4]
 * pushUnique(arr, 3); // arr = [1, 2, 3]
 *
 * @param array Array
 * @param element Primitive or Array
 * @returns Array
 */
const pushUnique = <ArrayType>(
  array: ArrayType[],
  element: ArrayType | ArrayType[]
) => {
  // multiple
  if (Array.isArray(element)) {
    let copy = [...array];
    element.forEach((el) => {
      if (!copy.includes(el)) copy = [...copy, el];
    });
    return copy;
  }

  // single
  if (array.includes(element)) return array;
  else return [...array, element];
};

export default pushUnique;
