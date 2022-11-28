import setClasses from "../../../util/set-classes";
import { Sizes } from "../../../types/sizes";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export interface InputTextProps extends React.ComponentPropsWithoutRef<"span"> {
  size?: keyof typeof textSizes;
  variant?: keyof typeof textVariants;
}

const textSizes: Sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
};

const textVariants = {
  error: "text-error-500 font-medium flex flex-row items-center",
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
      {variant === "error" && (
        <ExclamationCircleIcon className="mr-2 h-5 w-5" />
      )}
      {children}
    </span>
  );
};
