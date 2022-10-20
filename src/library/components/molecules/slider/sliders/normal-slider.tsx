import { motion } from "framer-motion";
import { useCallback, useContext, useEffect, useState } from "react";
import { Slider, SliderComponentProps } from "..";
import useSlider from "../../../../hooks/use-slider";
import useWindowResize from "../../../../hooks/use-window-resize";
import { SliderContext } from "../provider";

export interface NormalSliderProps
  extends Omit<SliderComponentProps, "isInfinite" | "snapToCenter"> {}

export const NormalSlider = ({
  extendSlides = Slider.defaultProps.extendSlides,
  offsetBy = Slider.defaultProps.offsetBy,
  children,
}: NormalSliderProps) => {
  const { size } = useContext(SliderContext);
  const { controls, slides, position, sliderRef } = useSlider({
    size,
    extendSlides,
    offsetBy,
    children,
  });

  // key is needed to force framer to update the contraints on resize
  const [dragConstraints, setDragConstraints] = useState({
    constraints: { left: 0, right: 60000 },
    key: 0,
  });

  const handleSetConstraints = useCallback(() => {
    if (sliderRef.current) {
      const { offsetWidth } = sliderRef.current;
      const sizePercentage = size / 100;
      const offset = offsetBy * offsetWidth * sizePercentage;
      const left = -(
        offsetWidth * (slides.length - 1) * sizePercentage -
        offset
      );
      const right = offsetWidth * offsetBy * sizePercentage;
      setDragConstraints((prev) => ({
        constraints: { left, right },
        key: prev.key + 1,
      }));
    }
  }, [sliderRef, slides, size, offsetBy]);

  useWindowResize(handleSetConstraints);

  useEffect(() => {
    if (sliderRef.current) {
      handleSetConstraints();
    }
  }, [sliderRef, handleSetConstraints]);

  console.log(dragConstraints);

  return (
    <motion.div
      ref={sliderRef}
      key={dragConstraints.key}
      animate={controls}
      className="relative h-fit w-full cursor-grab py-4"
      drag="x"
      dragElastic={1}
      dragConstraints={dragConstraints.constraints}
      whileTap={{ cursor: "grabbing" }}
      initial={{ translateX: `${position.offset}%` }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
      }}
    >
      {slides}
    </motion.div>
  );
};
