import { useContext } from "react";
import { GridContext } from ".";
import setClasses from "../../../util/set-classes";
import { BaseFlexProps, Flex } from "../flex";

export interface RowComponentProps
  extends Omit<BaseFlexProps, "direction" | "wrap" | "style"> {}

export const RowComponent = ({
  className,
  children,
  ...flexProps
}: RowComponentProps) => {
  const { colGutter, rowGutter } = useContext(GridContext);
  const classNames = setClasses([className]);

  const style = {
    marginLeft: `-${colGutter / 2}px`,
    marginRight: `-${colGutter / 2}px`,
    rowGap: `${rowGutter}px`,
  };
  return (
    <Flex
      direction="row"
      wrap="wrap"
      className={classNames}
      {...flexProps}
      style={style}
    >
      {children}
    </Flex>
  );
};
