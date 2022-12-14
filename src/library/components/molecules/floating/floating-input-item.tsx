import { useEffect, useMemo, useRef } from "react";
import { Colors } from "../../../types/colors";
import setClasses from "../../../util/set-classes";

interface FloatingInputItemProps
  extends Omit<React.ComponentPropsWithoutRef<"li">, "onClick" | "tabIndex"> {
  id?: string;
  onClick?: (id: string) => void;
  isSelected?: boolean;
  isCursor?: boolean;
  isDisabled?: boolean;
  isClickable?: boolean;
  color?: keyof typeof floatingOptionColors;
  children?: React.ReactNode;
}

export const floatingOptionColors: Colors = {
  brand: "bg-brand-700 text-white",
  secondary: "bg-brand-200",
  accent: "bg-accent-700 text-white",
  success: "bg-success-500 text-white",
  error: "bg-error-500 text-white",
  warning: "bg-warning-500 text-white",
  light: "bg-gray-200",
  dark: "bg-gray-800 text-white",
  none: "",
};

export const FloatingInputItem = ({
  id,
  onClick,
  isSelected = false,
  isCursor = false,
  isDisabled = false,
  isClickable = true,
  color = "brand",
  children,
  className,
  ...rest
}: FloatingInputItemProps) => {
  const ref = useRef<HTMLLIElement>(null);

  const classNames = useMemo(
    () =>
      setClasses([
        "h-fit w-full px-2 py-1 font-light transition-colors duration-150 first:rounded-t-md last:rounded-b-md scroll-m-20 select-none",
        !isSelected && !isDisabled && isClickable && "hover:bg-gray-200",
        isSelected && floatingOptionColors[color],
        isCursor && !isSelected && "bg-gray-200",
        isDisabled && "text-gray-400 cursor-not-allowed",
        isClickable && "cursor-pointer",
        className,
      ]),
    [className, color, isCursor, isDisabled, isSelected, isClickable]
  );

  const handleClick = () => {
    if (isDisabled) return;
    if (!id || !onClick) return;
    onClick(id);
  };

  useEffect(() => {
    if (!ref.current) return;
    if (isCursor)
      ref.current.scrollIntoView({
        block: "nearest",
      });
  }, [isCursor]);

  return (
    <li
      id={id}
      ref={ref}
      {...rest}
      tabIndex={0}
      onClick={handleClick}
      className={classNames}
    >
      {children}
    </li>
  );
};
