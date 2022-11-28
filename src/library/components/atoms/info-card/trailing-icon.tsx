import { FC } from "react";
import { Colors } from "../../../types/colors";
import setClasses from "../../../util/set-classes";

export const trailingIconColors: Colors = {
  brand: "bg-brand-50 ring-brand-100",
  secondary: "bg-white ring-brand-200",
  accent: "bg-accent-50 ring-accent-100",
  success: "bg-success-50 ring-success-100",
  error: "bg-error-50 ring-error-100",
  warning: "bg-warning-50 ring-warning-100",
  light: "bg-gray-50 ring-gray-100",
  dark: "bg-gray-900 ring-gray-800",
  none: "",
};

export const InfoCardTrailingIcon = ({
  trailingIcon: TrailingIcon,
  className,
  color = "brand",
}: {
  trailingIcon: FC<React.ComponentProps<"svg">>;
  className?: string;
  color?: keyof typeof trailingIconColors;
}) => {
  const classNames = setClasses([
    "absolute -top-6 -right-6 h-fit w-fit bg-white rounded-full p-2",
    className,
  ]);

  const innerClassNames = setClasses([
    "h-fit w-fit rounded-full p-2 ring-2",
    trailingIconColors[color],
  ]);

  return (
    <div className={classNames}>
      <div className={innerClassNames}>
        <TrailingIcon className="h-6 w-6" />
      </div>
    </div>
  );
};
