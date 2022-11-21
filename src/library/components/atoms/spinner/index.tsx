import { SpringColors } from "../../../types/spring-colors";
import { SpringSizes } from "../../../types/spring-sizes";
import setClasses from "../../../util/set-classes";

export interface SpinnerProps
  extends Omit<React.ComponentPropsWithoutRef<"svg">, "children"> {
  className?: string;
  size?: keyof typeof spinnerSizes;
  color?: keyof typeof spinnerColors;
}

const spinnerSizes: SpringSizes = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-12 h-12",
};

const spinnerColors: SpringColors = {
  brand: "text-brand-700",
  secondary: "text-brand-200",
  accent: "text-accent-700",
  success: "text-success-700",
  error: "text-error-700",
  warning: "text-warning-700",
  light: "text-gray-50",
  dark: "text-gray-800",
  none: "",
};

export const Spinner = ({
  size = "sm",
  color = "brand",
  className,
}: SpinnerProps) => {
  const classNames = setClasses([
    "animate-spin",
    spinnerSizes[size],
    spinnerColors[color],
    className,
  ]);
  return (
    <div role="status">
      <svg
        className={classNames}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
