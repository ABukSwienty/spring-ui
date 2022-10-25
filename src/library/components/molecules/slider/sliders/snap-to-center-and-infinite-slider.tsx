import { DraggableProps, motion } from "framer-motion";
import { useContext } from "react";
import { Slider, SliderComponentProps } from "..";
import useSlider from "../../../../hooks/use-slider";
import { getSwipePower } from "../../../../util/get-swipe-power";
import wrapArray from "../../../../util/wrap-array";
import { SliderContext } from "../provider";

export interface SnapToCenterAndInfiniteSliderProps
  extends Omit<SliderComponentProps, "mode"> {}

export const SnapToCenterAndInfiniteSlider = ({
  swipeConfidenceThreshold = Slider.defaultProps.swipeConfidenceThreshold,
  extendSlides = Slider.defaultProps.extendSlides,
  offsetBy = Slider.defaultProps.offsetBy,
  children,
}: SnapToCenterAndInfiniteSliderProps) => {
  const { size } = useContext(SliderContext);
  const { controls, slides, setSlides, position, sliderRef } = useSlider({
    size,
    extendSlides,
    offsetBy,
    children,
  });

  const handleCenter = () =>
    controls.set({
      translateX: `${position.offset}%`,
    });

  const handleRight = async () => {
    await controls.start({
      translateX: `${position.moveRight}%`,
    });

    setSlides((prev) => wrapArray(prev));
    handleCenter();
  };
  const handleLeft = async () => {
    await controls.start({
      translateX: `${position.moveLeft}%`,
    });

    setSlides((prev) => wrapArray(prev, "left"));
    handleCenter();
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
      onDragEnd={handleDragEnd}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
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
