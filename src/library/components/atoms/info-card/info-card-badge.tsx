import { SpringColors } from "../../../types/spring-colors";
import setClasses from "../../../utils/set-classes";

export const infoBadgeColors: SpringColors = {
  brand: "bg-brand-700 border border-brand-800 text-white",
  secondary: "",
  accent: "",
  success: "",
  error: "",
  warning: "",
  light: "",
  dark: "",
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
