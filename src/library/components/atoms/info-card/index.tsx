import { FC } from "react";
import { Colors } from "../../../types/colors";
import setClasses from "../../../util/set-classes";
import { InfoCardTrailingIcon } from "./trailing-icon";
import { InfoCardBadge } from "./info-card-badge";

export interface InfoCardProps extends React.ComponentPropsWithoutRef<"div"> {
  color?: keyof typeof infoCardColor;
  trailingBadge?: string;
  leadingBadge?: string;
  trailingIcon?: FC<React.ComponentProps<"svg">>;
  trailingIconWrapperClassName?: string;
}

export const infoCardColor: Colors = {
  brand: "bg-brand-50 border border-brand-100 text-brand-900",
  secondary: "bg-white border border-brand-200 text-brand-900",
  accent: "bg-accent-50 border border-accent-100 text-accent-900",
  success: "bg-success-50 border border-success-100 text-success-900",
  error: "bg-error-50 border border-error-100 text-error-900",
  warning: "bg-warning-50 border border-warning-100 text-warning-900",
  light: "bg-gray-50 border border-gray-100 text-gray-900",
  dark: "bg-gray-900 border border-gray-800 text-gray-50",
  none: "",
};

export const InfoCard = ({
  children,
  className,
  trailingIcon,
  trailingIconWrapperClassName,
  trailingBadge,
  leadingBadge,
  color = "brand",
}: InfoCardProps) => {
  const classNames = setClasses([
    "relative h-fit w-full rounded-lg p-8",
    className,
    infoCardColor[color],
  ]);
  return (
    <div className={classNames}>
      {trailingBadge && (
        <InfoCardBadge
          text={trailingBadge}
          color={color}
          pushLeft={trailingIcon ? true : false}
        />
      )}

      {leadingBadge && (
        <InfoCardBadge text={leadingBadge} color={color} position="left" />
      )}
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
