import queries from "./queries";
import useMediaQuery from "./use-media-query";

type Entries = [string, boolean][];

// minus one to get the last false value
const findLastFalseIndex = (entries: Entries) =>
  entries.findIndex(([_, value]) => value === false) - 1;

const findScreenSize = (entries: Entries, index: number) => {
  // if -1 all sizes are false
  if (index === -1) return entries[0][0];

  // if -2 all sizes are true
  if (index === -2) {
    return entries[entries.length - 1][0];
  }

  return entries[index][0];
};

/**
 * Get the current screensize based on the queries.ts table. Uses useMediaQuery.
 *
 * @example
 * const screenSize = useScreenSize(); // "sm" | "md" | "lg" | "xl" | "2xl"
 *
 * @returns string
 */
const useScreenSize = () => {
  const screenSizes = {
    sm: useMediaQuery("sm"),
    md: useMediaQuery("md"),
    lg: useMediaQuery("lg"),
    xl: useMediaQuery("xl"),
    "2xl": useMediaQuery("2xl"),
  };

  const entries: Entries = Object.entries(screenSizes);
  const last = findLastFalseIndex(entries);
  const size = findScreenSize(entries, last) as keyof typeof queries;

  return size;
};

export default useScreenSize;
