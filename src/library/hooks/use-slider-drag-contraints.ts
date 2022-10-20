import { RefObject, useCallback, useEffect, useState } from "react";
import useWindowResize from "./use-window-resize";

export interface UseSliderDragConstraintsProps {
  sliderRef: RefObject<HTMLDivElement>;
  offsetBy: number;
  slidesLength: number;
  slideSize: number;
}

const useSliderDragConstraints = ({
  sliderRef,
  offsetBy,
  slidesLength,
  slideSize,
}: UseSliderDragConstraintsProps) => {
  // key is needed to force framer to update the contraints on resize
  const [dragConstraints, setDragConstraints] = useState({
    constraints: { left: 0, right: 0 },
    key: 0,
  });

  const handleSetConstraints = useCallback(() => {
    if (sliderRef.current) {
      const { offsetWidth } = sliderRef.current;
      const sizePercentage = slideSize / 100;
      const offset = offsetBy * offsetWidth * sizePercentage;
      const left = -(
        offsetWidth * (slidesLength - 1) * sizePercentage -
        offset
      );
      const right = offsetWidth * offsetBy * sizePercentage;
      setDragConstraints((prev) => ({
        constraints: { left, right },
        key: prev.key + 1,
      }));
    }
  }, [sliderRef, slidesLength, slideSize, offsetBy]);

  useWindowResize(handleSetConstraints);

  useEffect(() => {
    if (sliderRef.current) {
      handleSetConstraints();
    }
  }, [sliderRef, handleSetConstraints]);

  return {
    dragConstraints,
  };
};

export default useSliderDragConstraints;
