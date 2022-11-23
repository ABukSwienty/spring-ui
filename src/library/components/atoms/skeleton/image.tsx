import { SpringSizes } from "../../../types/spring-sizes";
import setClasses from "../../../util/set-classes";

export interface SkeletonImageProps {
  size?: keyof typeof imageSizes;
  mode?: "rect" | "square";
}

const imageSizes: SpringSizes = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const imageSizeSqr: SpringSizes = {
  xs: "p-2",
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
  xl: "p-12",
};

const imageSizeRect: SpringSizes = {
  xs: "py-2 px-4",
  sm: "py-3 px-6",
  md: "py-4 px-8",
  lg: "py-8 px-16",
  xl: "py-12 px-24",
};

export const SkeletonImage = ({
  size = "md",
  mode = "square",
}: SkeletonImageProps) => {
  const iconClassNames = setClasses(["text-gray-300", imageSizes[size]]);
  const containerClassNames = setClasses([
    "flex h-fit w-fit animate-pulse items-center justify-center rounded bg-gray-200",
    mode === "square" ? imageSizeSqr[size] : imageSizeRect[size],
  ]);
  return (
    <div className={containerClassNames}>
      <svg
        className={iconClassNames}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 640 512"
      >
        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
      </svg>
    </div>
  );
};
