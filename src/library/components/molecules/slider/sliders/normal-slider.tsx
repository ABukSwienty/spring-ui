import { motion } from "framer-motion";
import { useContext } from "react";
import { Slider, SliderComponentProps } from "..";
import useSlider from "../../../../hooks/use-slider";
import useSliderDragConstraints from "../../../../hooks/use-slider-drag-contraints";
import { SliderContext } from "../provider";

export interface NormalSliderProps extends Omit<SliderComponentProps, "mode"> {}

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

  const { dragConstraints } = useSliderDragConstraints({
    sliderRef,
    offsetBy,
    slideSize: size,
    slidesLength: slides.length,
  });

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
