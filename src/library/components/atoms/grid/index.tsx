import { createContext } from "react";
import { RowComponent, RowComponentProps } from "./row";

export * from "./col";

export interface GridContextInterface {
  rowGutter: number;
  colGutter: number;
}

export const GridContext = createContext<GridContextInterface>(undefined!);

export interface GridProps {
  rowGutter?: number;
  colGutter?: number;
}

export const Row = ({
  rowGutter = 0,
  colGutter = 0,
  children,
  ...rowProps
}: GridProps & RowComponentProps) => {
  return (
    <GridContext.Provider value={{ rowGutter, colGutter }}>
      <RowComponent {...rowProps}>{children}</RowComponent>
    </GridContext.Provider>
  );
};
