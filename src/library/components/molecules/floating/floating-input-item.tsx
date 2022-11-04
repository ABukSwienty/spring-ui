import { useEffect, useMemo, useRef } from "react";
import { SpringColors } from "../../../types/spring-colors";
import setClasses from "../../../util/set-classes";

interface FloatingInputItemProps
  extends Omit<React.ComponentPropsWithoutRef<"li">, "onClick"> {
  id?: string;
  onClick?: (id: string) => void;
  isSelected?: boolean;
  isCursor?: boolean;
  isDisabled?: boolean;
  color?: keyof typeof floatingOptionColors;
  children?: React.ReactNode;
}

export const floatingOptionColors: SpringColors = {
  brand: "bg-brand-700 text-white",
  secondary: "bg-brand-200",
  accent: "bg-accent-700 text-white",
  success: "bg-success-500 text-white",
  error: "bg-error-500 text-white",
  warning: "bg-warning-500 text-white",
  light: "bg-gray-200",
  dark: "bg-gray-800 text-white",
};

export const FloatingInputItem = ({
  id,
  onClick,
  isSelected = false,
  isCursor = false,
  isDisabled = false,
  color = "brand",
  children,
  className,
  ...rest
}: FloatingInputItemProps) => {
  const ref = useRef<HTMLLIElement>(null);

  const classNames = useMemo(
    () =>
      setClasses([
        "h-fit w-full cursor-pointer px-2 py-1 font-light transition-colors duration-150 first:rounded-t-md last:rounded-b-md scroll-m-20",
        !isSelected && !isDisabled && "hover:bg-gray-200",
        isSelected && floatingOptionColors[color],
        isCursor && !isSelected && "bg-gray-200",
        isDisabled && "text-gray-400 cursor-not-allowed",
        className,
      ]),
    [className, color, isCursor, isDisabled, isSelected]
  );

  const handleClick = () => {
    if (isDisabled) return;
    if (!onClick || !id) return;
    onClick(id);
  };

  useEffect(() => {
    if (!ref.current) return;
    if (isCursor) ref.current.scrollIntoView();
  }, [isCursor]);

  return (
    <li
      ref={ref}
      id={id}
      {...rest}
      onClick={handleClick}
      className={classNames}
    >
      {children}
    </li>
  );
};
