import { useCallback, useRef } from "react";
import { OmitFramerProps } from "../../../types/omit-framer-props";
import { Colors } from "../../../types/colors";
import { Sizes } from "../../../types/sizes";
import setClasses from "../../../util/set-classes";
import { BaseFlexProps, Flex } from "../flex";
import { Label } from "../label";

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<"input">,
    OmitFramerProps | "type" | "size"
  > {
  color?: keyof typeof checkboxColors;
  size?: keyof typeof checkboxSizes;
  icon?: "check" | "x";
  label?: string;
  name: string;
  isDynamic?: boolean;
}

const checkboxSizes: Pick<Sizes, "md" | "lg"> = {
  md: "w-4 h-4",
  lg: "w-6 h-6",
};

const checkboxColors: Colors = {
  brand:
    "checked:border-brand-700 checked:bg-brand-700 focus:ring-2 focus:ring-brand-700",
  secondary:
    "checked:border-brand-200 checked:bg-brand-200 focus:ring-2 focus:ring-brand-200",
  accent:
    "checked:border-accent-700 checked:bg-accent-700 focus:ring-2 focus:ring-accent-700",
  success:
    "checked:border-success-700 checked:bg-success-700 focus:ring-2 focus:ring-success-700",
  error:
    "checked:border-error-700 checked:bg-error-700 focus:ring-2 focus:ring-error-700",
  warning:
    "checked:border-warning-700 checked:bg-warning-700 focus:ring-2 focus:ring-warning-700",
  light:
    "checked:border-gray-50 checked:bg-gray-50 focus:ring-2 focus:ring-gray-50",
  dark: "checked:border-gray-800 checked:bg-gray-800 focus:ring-2 focus:ring-gray-800",
  none: "",
};

const iconColors: Colors = {
  brand: "text-white",
  secondary: "text-white",
  accent: "text-white",
  success: "text-white",
  error: "text-white",
  warning: "text-white",
  light: "text-gray-900",
  dark: "text-white",
  none: "",
};

const iconSizes: Pick<Sizes, "md" | "lg"> = {
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const labelSizes: Pick<Sizes, "md" | "lg"> = {
  md: "text-sm",
  lg: "text-base",
};

export const Checkbox = ({
  color = "brand",
  size = "md",
  icon = "check",
  className,
  label = "",
  direction = "row",
  justify,
  align = "center",
  alignSelf,
  wrap,
  isDynamic = true,
  ...props
}: CheckboxProps & Omit<BaseFlexProps, "children" | "className">) => {
  const ref = useRef<HTMLInputElement>(null);
  const classNames = setClasses([
    "peer appearance-none rounded border ring-1 ring-transparent transition-[shadow,color,background-color,border-color,text-decoration-color,fill,stroke] duration-100 ease-out focus:ring-offset-2 border-gray-300 bg-gray-100 cursor-pointer",
    checkboxColors[color],
    checkboxSizes[size],
    className,
  ]);

  const iconClassNames = setClasses([
    "pointer-events-none absolute scale-0 select-none opacity-0 transition-all delay-75 duration-100 ease-out peer-checked:scale-100 peer-checked:opacity-100 cursor-pointer",
    iconColors[color],
    iconSizes[size],
  ]);

  const labelClassNames = setClasses([
    "select-none font-medium text-gray-600 cursor-pointer",
    labelSizes[size],
  ]);

  const handleClick = useCallback(() => {
    if (!ref.current) return;
    if (isDynamic) ref.current.checked = !ref.current.checked;
  }, [isDynamic]);

  return (
    <Flex
      direction={direction}
      align={align}
      justify={justify}
      alignSelf={alignSelf}
      wrap={wrap}
      onClick={handleClick}
      className={isDynamic ? "cursor-pointer" : ""}
    >
      <div className="relative mr-2.5 flex h-fit w-fit items-center justify-center">
        <input
          ref={ref}
          id={props.id ? props.id : props.name}
          className={classNames}
          {...props}
          type="checkbox"
        />
        {icon === "check" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="4"
            stroke="currentColor"
            className={iconClassNames}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        )}
        {icon === "x" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="4"
            stroke="currentColor"
            className={iconClassNames}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
      <Label
        htmlFor={props.id ? props.id : props.name}
        className={labelClassNames}
      >
        {label}
      </Label>
    </Flex>
  );
};
