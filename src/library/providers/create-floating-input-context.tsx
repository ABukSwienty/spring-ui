import React, { createContext, useContext } from "react";
import useSubscribableStore from "../hooks/use-subscribable-store";

export const createFloatingInputContext = <
  ValueType extends string | number,
  Name extends string
>() => {
  interface ContextParams<ValueType extends string | number> {}

  const Context = createContext<ContextParams<ValueType>>({});

  const Provider = ({ children }: { children: React.ReactNode }) => {
    const options = useSubscribableStore({});

    /*   const selected = useSubscribableStore({});

  const cursor = useSubscribableStore({});

  const isOpen = useSubscribableStore({ isOpen: false }); */

    return <Context.Provider value={{}}>{children}</Context.Provider>;
  };

  const useFloatingInputContext = () => {
    const context = useContext(Context);

    return context;
  };

  return {
    Provider,
    useFloatingInputContext,
  };
};

/* export interface FloatingInputOptionsContextParams {}

const FloatingInputOptionsContext =
  createContext<FloatingInputOptionsContextParams>({});

const FloatingInputOptionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const options = useSubscribableStore({});

  const selected = useSubscribableStore({});

  const cursor = useSubscribableStore({});

  const isOpen = useSubscribableStore({ isOpen: false });

  return (
    <FloatingInputOptionsContext.Provider value={{}}>
      {children}
    </FloatingInputOptionsContext.Provider>
  );
};

export default FloatingInputOptionsProvider; */
