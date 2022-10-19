import { useAnimationControls, motion, Variant } from "framer-motion";
import { Children, useContext, useMemo, useRef, useState } from "react";
import { getSwipePower } from "../../../utils/get-swipe-power";
import wrapArray from "../../../utils/wrap-array";
import SliderProvider, { SliderContext } from "./provder";
import Slide from "./slide";
import getSlideOffset from "./utils/get-slide-offset";

export interface SliderComponentProps {
  swipeConfidenceThreshold?: number;
  isInfinite?: boolean;
  isCentered?: boolean;
  children: JSX.Element[];
  slideInViewAnimation?: (inView: boolean) => Variant;
}

const Component = ({
  swipeConfidenceThreshold = 10000,
  children,
}: SliderComponentProps) => {
  const { root, size } = useContext(SliderContext);
  const controls = useAnimationControls();

  const childElements = useMemo(
    () => [...Children.toArray(children)],
    [children]
  );

  const position = useRef(getSlideOffset(size, childElements.length));

  const [elements, setElements] = useState(
    [...childElements, ...childElements].map((child, index) => (
      <Slide key={index}>{child}</Slide>
    ))
  );

  const handleCenter = () =>
    controls.set({
      translateX: `${position.current.offset}%`,
    });

  const handleRight = async () => {
    await controls.start({
      translateX: `${position.current.moveRight}%`,
    });
    setElements((prev) => wrapArray(prev));
    handleCenter();
  };

  const handleLeft = async () => {
    await controls.start({
      translateX: `${position.current.moveLeft}%`,
    });
    setElements((prev) => wrapArray(prev, "left"));
    handleCenter();
  };

  return (
    <div
      ref={root}
      className="relative h-fit w-full overflow-hidden whitespace-nowrap"
    >
      <motion.div
        initial={{
          translateX: `${position.current.offset}%`,
        }}
        animate={controls}
        className="relative h-fit w-full py-4"
        drag="x"
        /* onDragStart={() => lock()} */
        dragElastic={1}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = getSwipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            handleRight();
          } else if (swipe > swipeConfidenceThreshold) {
            handleLeft();
          }
          /* unlock(); */
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 30,
        }}
      >
        {elements}
      </motion.div>
    </div>
  );
};

export interface SliderProps extends SliderComponentProps {
  slideSize?: number;
}

const Slider = ({ slideSize = 75, ...props }: SliderProps) => {
  return (
    <SliderProvider size={slideSize}>
      <Component {...props} />
    </SliderProvider>
  );
};

export { Slider };
