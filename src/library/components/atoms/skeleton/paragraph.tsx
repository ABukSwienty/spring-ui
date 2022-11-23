import { useMemo } from "react";
import { SkeletonProps } from ".";
import setClasses from "../../../util/set-classes";

const SkeletonParagraph = ({
  rows = 1,
  className,
}: { rows?: number } & SkeletonProps) => {
  const classNames = setClasses([
    "mb-3 h-2.5 w-full animate-pulse rounded-full bg-gray-200 last:mb-0",
    className,
  ]);
  const paragraphs = useMemo(
    () =>
      Array.from({ length: rows }).map((_, index) => (
        <div key={index} className={classNames} />
      )),
    [rows, classNames]
  );

  return <>{paragraphs}</>;
};

export default SkeletonParagraph;
