import { DraggableProps, motion } from "framer-motion";
import { useContext, useState } from "react";
import { Slider, SliderComponentProps } from "..";
import useSlider from "../../../../hooks/use-slider";
import { getSwipePower } from "../../../../util/get-swipe-power";
import { SliderContext } from "../provider";

export interface SnapToCenterSliderProps
  extends Omit<SliderComponentProps, "mode"> {}

export const SnapToCenterSlider = ({
  swipeConfidenceThreshold = Slider.defaultProps.swipeConfidenceThreshold,
  extendSlides = Slider.defaultProps.extendSlides,
  offsetBy = Slider.defaultProps.offsetBy,
  children,
}: SnapToCenterSliderProps) => {
  const { size } = useContext(SliderContext);
  const { controls, slides, position, sliderRef } = useSlider({
    size,
    extendSlides,
    offsetBy,
    children,
  });

  const maxRight = -((slides.length - 1) * size - position.centralOffset);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentOffset] = useState(position.offset);

  const handleRight = async () => {
    setCurrentOffset((prev) => {
      const move = prev - size;
      if (move < maxRight) {
        return prev;
      }
      controls.start({
        translateX: `${move}%`,
      });
      return move;
    });
  };

  const handleLeft = async () => {
    setCurrentOffset((prev) => {
      const move = prev + size;
      if (move > position.centralOffset) {
        return prev;
      }
      controls.start({
        translateX: `${move}%`,
      });
      return move;
    });
  };

  const handleDragEnd: DraggableProps["onDragEnd"] = (
    e,
    { offset, velocity }
  ) => {
    const swipe = getSwipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleRight();
    } else if (swipe > swipeConfidenceThreshold) {
      handleLeft();
    }
  };

  return (
    <motion.div
      ref={sliderRef}
      animate={controls}
      className="relative h-fit w-full cursor-grab py-4"
      drag="x"
      dragElastic={1}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
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
