import { useRef } from "react";

const createSubscribable = <PayloadType>() => {
  const subscribers: Set<(payload: PayloadType) => void> = new Set();

  return {
    subscribe(cb: (payload: PayloadType) => void): () => void {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },

    emit(payload: PayloadType): void {
      subscribers.forEach((cb) => cb(payload));
    },
  };
};

interface UseSubScribableReturn<PayloadType> {
  /**
   * Subscribe method. Returns a function to unsubscribe.
   */
  subscribe: (cb: (payload: PayloadType) => void) => () => void;
  /**
   * Emit method. Passes the payload to all subscribers.
   */
  emit: (payload: PayloadType) => void;
}

/**
 * Simple publisher subscriber pattern.
 * Subscription immediately returns the function to unsubscribe.
 * Add generic type to the function to specify the payload type.
 * @example
 * const { subscribe, emit } = useSubscribable<PayloadType>();
 * const unsubscribe = subscribe((payload) => coolPayloadFn(payload));
 * @endexample
 *
 * @returns {on, emit}
 */
const useSubscribable = <PayloadType>(): UseSubScribableReturn<PayloadType> => {
  const subscribable = useRef(createSubscribable<PayloadType>());

  return {
    subscribe: subscribable.current.subscribe,
    emit: subscribable.current.emit,
  };
};

export default useSubscribable;
