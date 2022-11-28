import { Colors } from "../../../types/colors";
import setClasses from "../../../util/set-classes";

export interface ItemProps {
  children: React.ReactNode;
  isHoverable?: boolean;
  isActive?: boolean;
  isCurrent?: boolean;
  size?: keyof typeof itemSize;
  onClick?: () => void;
  color: keyof typeof itemColors;
}

const itemSize = {
  day: "p-2",
  month: "px-4 py-2",
  year: "px-6 py-2.5",
};

const itemColors: Colors = {
  brand: "bg-brand-700 text-white cursor-pointer",
  secondary: "bg-white ring-2 ring-brand-700 text-brand-700 cursor-pointer",
  accent: "bg-accent-700 text-white cursor-pointer",
  success: "bg-success-700 text-white cursor-pointer",
  error: "bg-error-700 text-white cursor-pointer",
  warning: "bg-warning-700 text-white cursor-pointer",
  light: "bg-gray-100 text-gray-900 cursor-pointer",
  dark: "bg-gray-900 text-white cursor-pointer",
  none: "",
};

const Item = ({
  children,
  isHoverable = true,
  isActive = false,
  isCurrent = true,
  size = "day",
  color,
  onClick,
}: ItemProps) => {
  const classNames = setClasses([
    "flex items-center justify-center text-sm font-medium rounded-lg select-none",
    isHoverable && !isActive && "hover:bg-gray-100 cursor-pointer",
    isActive && itemColors[color],
    isCurrent && !isActive && "text-gray-900",
    !isCurrent && !isActive && "text-gray-400",
    itemSize[size],
  ]);
  return (
    <span onClick={onClick} className={classNames}>
      {children}
    </span>
  );
};

export default Item;
