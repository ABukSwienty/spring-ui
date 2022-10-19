import { SpringColors } from "../../../types/spring-colors";
import setClasses from "../../../utils/set-classes";

export const infoBadgeColors: SpringColors = {
  brand: "bg-brand-700 border border-brand-800 text-white",
  secondary: "bg-white border border-brand-200 text-brand-900",
  accent: "bg-accent-700 border border-accent-800 text-white",
  success: "bg-success-700 border border-success-800 text-white",
  error: "bg-error-700 border border-error-800 text-white",
  warning: "bg-warning-700 border border-warning-800 text-white",
  light: "bg-gray-100 border border-gray-200 text-gray-900",
  dark: "bg-gray-800 border border-gray-900 text-white",
};

export interface InfoCardBadgeProps {
  color: keyof typeof infoBadgeColors;
  text: string;
  pushLeft?: boolean;
  position?: "left" | "right";
}

export const InfoCardBadge = ({
  color,
  text,
  pushLeft = false,
  position = "right",
}: InfoCardBadgeProps) => {
  const classNames = setClasses([
    "absolute -top-3 font-medium rounded-md text-sm px-2 py-1",
    infoBadgeColors[color],
    pushLeft && "right-12",
    position === "left" && "left-2",
    position === "right" && !pushLeft
      ? "right-2"
      : position === "right" && pushLeft && "right-12",
  ]);
  return <div className={classNames}>{text}</div>;
};
