import { BeakerIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { SpringColors } from "../../../types/spring-colors";
import setClasses from "../../../utils/set-classes";

export interface InfoCardProps extends React.ComponentPropsWithoutRef<"div"> {
  color?: keyof typeof infoCardColor;
  trailingIcon?: FC<React.ComponentProps<"svg">>;
  trailingIconWrapperClassName?: string;
}

export const infoCardColor: SpringColors = {
  brand: "bg-brand-50 border border-brand-100 text-brand-900",
  secondary: "bg-white border border-brand-200 text-brand-900",
  accent: "bg-accent-50 border border-accent-100 text-accent-900",
  success: "bg-success-50 border border-success-100 text-success-900",
  error: "bg-error-50 border border-error-100 text-error-900",
  warning: "bg-warning-50 border border-warning-100 text-warning-900",
  light: "bg-gray-50 border border-gray-100 text-gray-900",
  dark: "bg-gray-900 border border-gray-800 text-gray-50",
};

export const trailingIconColors: SpringColors = {
  brand: "bg-brand-50 ring-brand-100",
  secondary: "bg-white ring-brand-200",
  accent: "bg-accent-50 ring-accent-100",
  success: "bg-success-50 ring-success-100",
  error: "bg-error-50 ring-error-100",
  warning: "bg-warning-50 ring-warning-100",
  light: "bg-gray-50 ring-gray-100",
  dark: "bg-gray-900 ring-gray-800",
};

const InfoCardTrailingIcon = ({
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

export const InfoCard = ({
  children,
  className,
  trailingIcon,
  trailingIconWrapperClassName,
  color = "brand",
}: InfoCardProps) => {
  const classNames = setClasses([
    "relative h-fit w-full rounded-lg p-8",
    className,
    infoCardColor[color],
  ]);
  return (
    <div className={classNames}>
      {trailingIcon && (
        <InfoCardTrailingIcon
          className={trailingIconWrapperClassName}
          trailingIcon={trailingIcon}
          color={color}
        />
      )}
      <p>{children}</p>
    </div>
  );
};
