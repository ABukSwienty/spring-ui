import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { SpringColors } from "../../../types/spring-colors";
import { SpringSizes } from "../../../types/spring-sizes";
import setClasses from "../../../util/set-classes";
import { Flex, FlexAs, GenericFlexProps } from "../../atoms/flex";

export interface TimeLineItemHeaderProps<T extends FlexAs>
  extends Omit<GenericFlexProps<T>, "as" | "children"> {
  children?: React.ReactNode;
  heading?: string | JSX.Element;
  point?: FC<React.ComponentProps<"svg">>;
  time?: string | JSX.Element;
  color?: keyof SpringColors;
  size?: keyof typeof pointIconSizes;
}

const pointIconColor: SpringColors = {
  brand: "text-brand-50",
  secondary: "text-brand-500",
  accent: "text-accent-500",
  success: "text-success-500",
  error: "text-error-500",
  warning: "text-warning-500",
  light: "text-gray-800",
  dark: "text-gray-200",
  none: "",
};

const pointWrapperColor: SpringColors = {
  brand: "bg-brand-500",
  secondary: "bg-brand-200",
  accent: "bg-accent-200",
  success: "bg-success-200",
  error: "bg-error-200",
  warning: "bg-warning-200",
  light: "bg-gray-200",
  dark: "bg-gray-800",
  none: "",
};

const pointIconSizes: Pick<SpringSizes, "md" | "sm"> = {
  md: "h-4 w-4",
  sm: "h-2.5 w-2.5",
};

const pointWrapperSizes: Pick<SpringSizes, "md" | "sm"> = {
  md: "h-6 w-6 -left-3",
  sm: "h-4 w-4 -left-2",
};

const headingSizes: Pick<SpringSizes, "md" | "sm"> = {
  md: "text-lg",
  sm: "text-sm",
};

export const TimeLineItemHeader = <T extends FlexAs>({
  direction = "row",
  align = "center",
  children,
  heading,
  point: Point,
  time,
  className,
  color = "brand",
  size = "md",
  ...flexProps
}: TimeLineItemHeaderProps<T>) => {
  const classNames = setClasses(["w-full", className]);

  const pointIconClassNames = setClasses([
    pointIconColor[color],
    pointIconSizes[size],
  ]);

  const pointWrapperClassNames = setClasses([
    pointWrapperColor[color],
    pointWrapperSizes[size],
    "absolute flex items-center justify-center rounded-full ring-8 ring-white",
  ]);

  const headingClassNames = setClasses([
    "flex items-center font-semibold text-gray-900",
    headingSizes[size],
  ]);

  return (
    <>
      <Flex
        as="div"
        direction={direction}
        align={align}
        className={classNames}
        {...flexProps}
      >
        {Point && (
          <div className={pointWrapperClassNames}>
            <Point className={pointIconClassNames} />
          </div>
        )}
        {!Point && (
          <div
            className={`absolute -left-1.5 h-3 w-3 rounded-full border border-white ${pointWrapperColor[color]}`}
          />
        )}
        <h3 className={headingClassNames}>{heading}</h3>
        {children}
      </Flex>
      {time && (
        <time className="mb-2 block text-sm font-normal leading-none text-gray-400">
          {time}
        </time>
      )}
    </>
  );
};
