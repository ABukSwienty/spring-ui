import { SpringColors } from "../../../types/spring-colors";
import setClasses from "../../../util/set-classes";

interface FloatingInputItemProps {
  id: string;
  onClick: (id: string) => void;
  isSelected?: boolean;
  isCursor?: boolean;
  isDisabled?: boolean;
  color: keyof typeof optionColors;
  children?: React.ReactNode;
}

const optionColors: SpringColors = {
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
  color,
  children,
}: FloatingInputItemProps) => {
  const classNames = setClasses([
    "h-fit w-full cursor-pointer px-2 py-1 font-light transition-colors duration-150 first:rounded-t-md last:rounded-b-md",
    !isSelected && !isDisabled && "hover:bg-gray-200",
    isSelected && !isCursor && optionColors[color],
    isCursor && "bg-gray-200",
    isDisabled && "text-gray-400 cursor-not-allowed",
  ]);
  const handleClick = () => {
    if (isDisabled) return;
    onClick(id);
  };
  return (
    <li id={id} onClick={handleClick} className={classNames}>
      {children}
    </li>
  );
};
