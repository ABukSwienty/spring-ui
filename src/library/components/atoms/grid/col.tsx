import { CSSProperties, useContext } from "react";
import { GridContext } from ".";
import setClasses from "../../../util/set-classes";
import {
  colSizes,
  lgSizes,
  mdSizes,
  smSizes,
  xlSizes,
  xxlSizes,
} from "./constants";
import getFlexStyle from "./util";

export type FlexColProp = 1 | 2 | 3 | 4 | 5;

export interface ColProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style"> {
  span?: keyof typeof colSizes;
  offset?: keyof typeof colSizes;
  sm?: keyof typeof smSizes;
  md?: keyof typeof mdSizes;
  lg?: keyof typeof lgSizes;
  xl?: keyof typeof xlSizes;
  "2xl"?: keyof typeof xxlSizes;
  flex?: CSSProperties["flex"] | "auto" | FlexColProp;
}

export const Col = ({
  offset,
  span = 24,
  children,
  className,
  sm,
  md,
  lg,
  xl,
  "2xl": xxl,
  flex,
  ...props
}: ColProps) => {
  const { colGutter } = useContext(GridContext);

  const wrapperClassNames = setClasses([
    "block",
    !flex && colSizes[span],
    !flex && sm && smSizes[sm],
    !flex && md && mdSizes[md],
    !flex && lg && lgSizes[lg],
    !flex && xl && xlSizes[xl],
    !flex && xxl && xxlSizes[xxl],
  ]);

  const offsetClassNames = setClasses([
    "block opacity-0",
    offset && colSizes[offset],
  ]);

  const colClassNames = setClasses(["w-full", className]);

  const style: CSSProperties = {
    paddingLeft: `${colGutter / 2}px`,
    paddingRight: `${colGutter / 2}px`,
  };

  if (flex) style.flex = getFlexStyle(flex);

  return (
    <>
      {offset && <div className={offsetClassNames} style={style} />}
      <div className={wrapperClassNames} style={style}>
        <div className={colClassNames} {...props}>
          {children}
        </div>
      </div>
    </>
  );
};
