import { SkeletonProps } from ".";
import setClasses from "../../../util/set-classes";

const SkeletonButton = ({ className }: SkeletonProps) => {
  const classNames = setClasses([
    "h-6 w-32 animate-pulse rounded-lg bg-gray-200",
    className,
  ]);
  return <div className={classNames} />;
};

export default SkeletonButton;
