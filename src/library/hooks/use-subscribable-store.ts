import { useCallback, useRef } from "react";
import useSubscribable from "./use-subscribable";

type InitialStore<Store> = Store;

type SetParams<Store> = Partial<Store> | ((store: Store) => Partial<Store>);

interface UseSubscribableStoreReturn<Store extends Record<any, any>> {
  /**
   * Get the current store
   */
  get: () => Store;
  /**
   * Set the store. Pass an object or a function that receives the latest store and returns a new state.
   *
   * @example
   * set({ state: "new state" });
   * set((prev) => ({ ...prev, state: "new state" }));
   */
  set: (newStore: SetParams<Store>) => void;
  /**
   * Subscribe to store updates. Returns a function to unsubscribe and receives the latest store.
   *
   * @example
   * const unsubscribe = subscribe((store) => coolStoreFn(store));
   */
  subscribe: (cb: (store: Store) => void) => () => void;
}

/**
 * A hook that allows you to subscribe to a store and update it. Useful for contexts that update frequently and you only want to update the parts of the UI that need it.
 *
 * Works well in tandem with React 18 hook useSyncExternalStore
 * @example
 * const store = useSubscribableStore({
 *  state: "important state",
 *  anotherState: { important: true },
 * });
 *
 * // subscribe to all updates
 * const state = useSyncExternalStore(store.subscribe, ()=>store.getState());
 *
 * // subscribe to specific updates
 * const state = useSyncExternalStore(store.subscribe, ()=>store.getState().state);
 *
 * // subscribe to even more granular updates with useSyncExternalStore
 * const state = useSyncExternalStore(store.subscribe, ()=>store.getState().anotherState.important);
 *
 * @param initialStore Object with initial store values
 * @returns Object with getter, setter and subscribe methods
 */
const useSubscribableStore = <Store extends Record<any, any>>(
  initialStore: InitialStore<Store>
): UseSubscribableStoreReturn<Store> => {
  const store = useRef<InitialStore<Store>>(initialStore);

  const { subscribe, emit } = useSubscribable<Store>();

  const get = useCallback(() => store.current, []);

  const set = useCallback(
    (newStore: SetParams<Store>) => {
      if (typeof newStore === "function") {
        Object.assign(store.current, newStore(store.current));
      }

      if (typeof newStore === "object") {
        Object.assign(store.current, newStore);
      }

      emit(store.current);
    },
    [emit]
  );

  return {
    get,
    set,
    subscribe,
  };
};

export default useSubscribableStore;
