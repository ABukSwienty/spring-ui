import { SkeletonProps } from ".";
import setClasses from "../../../util/set-classes";

const SkeletonTitle = ({ className }: SkeletonProps) => {
  const classNames = setClasses([
    "h-23 mb-4 h-4 w-20 animate-pulse rounded-full bg-gray-200",
    className,
  ]);
  return <div className={classNames} />;
};

export default SkeletonTitle;
