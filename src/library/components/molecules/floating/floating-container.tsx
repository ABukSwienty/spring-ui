import {
  useFloating,
  flip,
  shift,
  ReferenceType,
  Strategy,
  Placement,
  offset,
} from "@floating-ui/react-dom";
import React from "react";
import setClasses from "../../../util/set-classes";

type FloatingArgs = {
  x: number | null;
  y: number | null;
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  strategy: Strategy;
};

type FloatingChildrenFn = (args: FloatingArgs) => React.ReactNode;

export interface FloatingContainerProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  children: FloatingChildrenFn;
  className?: string;
  strategy?: Strategy;
  placement?: Placement;
  offset?: number;
}

export const FloatingContainer = ({
  children,
  className,
  strategy: strategyProps = "absolute",
  placement: placementProps = "bottom",
  offset: offsetProps = 0,
  ...rest
}: FloatingContainerProps) => {
  const classNames = setClasses(["relative", className]);

  const { x, y, reference, floating, strategy } = useFloating({
    strategy: strategyProps,
    placement: placementProps,
    middleware: [offset(offsetProps), flip(), shift()],
  });

  return (
    <div className={classNames} {...rest}>
      {children({ x, y, reference, floating, strategy })}
    </div>
  );
};
