import setClasses from "../../../util/set-classes";

export type FlexAs = "div" | "section" | "article" | "aside" | "ul" | "li";

export interface GenericFlexProps<T extends FlexAs> {
  className?: string;
  children: React.ReactNode;
  direction?: keyof typeof flexDirection;
  justify?: keyof typeof flexJustify;
  align?: keyof typeof flexAlign;
  alignSelf?: keyof typeof flexAlignSelf;
  wrap?: keyof typeof flexWrap;
  as?: T;
}

export type FlexProps<T extends FlexAs> =
  React.ComponentPropsWithoutRef<FlexAs> & GenericFlexProps<T>;

const flexDirection = {
  rowReverse: "flex-row-reverse",
  colReverse: "flex-col-reverse",
  row: "flex-row",
  col: "flex-col",
};

const flexWrap = {
  wrap: "flex-wrap",
  reverse: "flex-wrap-reverse",
  noWrap: "flex-nowrap",
};

const flexJustify = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const flexAlign = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const flexAlignSelf = {
  auto: "place-self-auto",
  start: "place-self-start",
  end: "place-self-end",
  center: "place-self-center",
  baseline: "place-self-baseline",
  stretch: "place-self-stretch",
};

export const Flex = <T extends FlexAs>({
  children,
  direction,
  justify,
  align,
  wrap,
  alignSelf,
  className,
  as: Element,
  ...props
}: FlexProps<T>) => {
  const classNames = setClasses([
    "flex",
    className,
    direction && flexDirection[direction],
    justify && flexJustify[justify],
    align && flexAlign[align],
    wrap && flexWrap[wrap],
    alignSelf && flexAlignSelf[alignSelf],
  ]);
  const Component = Element ? Element : ("div" as React.ElementType);
  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};
