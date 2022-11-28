import { useCallback } from "react";

const useRefCallback = <RefType>(callback: (node: RefType | null) => void) => {
  const ref = useCallback(callback, [callback]);
  return { ref };
};

export default useRefCallback;
