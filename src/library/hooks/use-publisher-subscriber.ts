import { useRef } from "react";

const createSubscribable = <PayloadType>() => {
  const subscribers: Set<(payload: PayloadType) => void> = new Set();

  return {
    on(cb: (payload: PayloadType) => void): () => void {
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

/**
 * Simple publisher subscriber pattern.
 * Subscription immediately returns the function to unsubscribe.
 * Add generic type to the function to specify the payload type.
 * @example
 * const { on, emit } = usePublisherSubscriber<PayloadType>();
 * const unsubscribe = on((payload) => coolPayloadFn(payload));
 * @endexample
 *
 *
 *
 * @returns {on, emit}
 */
const usePublisherSubscriber = <PayloadType>() => {
  const store = useRef(createSubscribable<PayloadType>());

  return {
    on: store.current.on,
    emit: store.current.emit,
  };
};

export default usePublisherSubscriber;
