import { useCallback, useEffect, useState } from "react";
import queries from "./queries";

export const numberToQuery = (number: number): string =>
  `(min-width: ${number}px)`;

/**
 * Use window.matchMedia API to determine screen size.
 * Supports string or number as argument.
 * String based off of queries.ts table:
 * @see src/library/hooks/media-query/queries.ts
 *
 * @example
 * const isLargeScreen = useMediaQuery("lg"); // returns true or false
 *
 * const is4kScreen = useMediaQuery(3840); // returns true or false
 *
 * @param query string | number
 * @returns boolean
 */
const useMediaQuery = (query: keyof typeof queries | number): boolean => {
  const mediaQuery =
    typeof query === "number"
      ? numberToQuery(query)
      : numberToQuery(queries[query]);

  const getMatches = useCallback((): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(mediaQuery).matches;
    }
    return false;
  }, [mediaQuery]);

  const [matches, setMatches] = useState<boolean>(getMatches());

  useEffect(() => {
    const handleChange = () => {
      setMatches(getMatches());
    };

    const matchMedia = window.matchMedia(mediaQuery);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query, getMatches, mediaQuery]);

  return matches;
};

export default useMediaQuery;
