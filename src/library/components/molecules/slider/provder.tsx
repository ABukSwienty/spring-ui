import { createContext, useRef } from "react";

export interface SliderContextInterface {
  root: React.RefObject<HTMLDivElement>;
  size: number;
}

export const SliderContext = createContext<SliderContextInterface>({
  root: { current: null },
  size: 0,
});

const SliderProvider = ({
  children,
  size,
}: {
  children: React.ReactNode;
  size: number;
}) => {
  if (size > 100) throw Error("Slide size can not excede 100%");
  const root = useRef(null);
  return (
    <SliderContext.Provider value={{ root, size }}>
      {children}
    </SliderContext.Provider>
  );
};

export default SliderProvider;
