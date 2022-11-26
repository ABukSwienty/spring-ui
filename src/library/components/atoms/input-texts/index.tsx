import setClasses from "../../../util/set-classes";
import { SpringSizes } from "../../../types/spring-sizes";

export interface InputTextProps extends React.ComponentPropsWithoutRef<"span"> {
  size?: keyof typeof textSizes;
  variant?: keyof typeof textVariants;
}

const textSizes: SpringSizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
};

const textVariants = {
  error: "text-error-500 font-medium",
  helper: "text-gray-600 font-light",
  cornerHint: "text-gray-600 font-light float-right",
};

export const InputText = ({
  className,
  children,
  size = "sm",
  variant = "helper",
  ...rest
}: InputTextProps) => {
  const classNames = setClasses([
    className,
    textSizes[size],
    textVariants[variant],
  ]);

  return (
    <span className={classNames} {...rest}>
      {children}
    </span>
  );
};
