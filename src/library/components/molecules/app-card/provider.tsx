import { AnimateSharedLayout, LayoutGroup } from "framer-motion";
import React, { createContext } from "react";
import queries from "../../../hooks/media-query/queries";
import useScreenSize from "../../../hooks/media-query/use-screen-size";

export interface AppCardContextInterface {
  screenSize: keyof typeof queries | undefined;
}

export const AppCardContext = createContext<AppCardContextInterface>({
  screenSize: undefined,
});

export const AppCardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const screenSize = useScreenSize();
  return (
    <AppCardContext.Provider value={{ screenSize }}>
      {/* <LayoutGroup>{children}</LayoutGroup> */}
      {children}
    </AppCardContext.Provider>
  );
};
