import { SkeletonProps } from ".";
import { Sizes } from "../../../types/sizes";
import setClasses from "../../../util/set-classes";

export interface SkeletonUserProps {
  size?: keyof typeof userSizes;
}

const userSizes: Sizes = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const SkeletonUser = ({
  size = "md",
  className,
}: SkeletonUserProps & SkeletonProps) => {
  const classNames = setClasses([
    "inline animate-pulse text-gray-200",
    userSizes[size],
    className,
  ]);
  return (
    <svg
      className={classNames}
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default SkeletonUser;
