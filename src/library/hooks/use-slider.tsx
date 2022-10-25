import { useAnimationControls } from "framer-motion";
import { useMemo, Children, useState, useRef } from "react";
import Slide from "../components/molecules/slider/slide";
import extendArray from "../util/extend-array";
import getSlideOffset from "../util/get-slide-offset";

export interface useSliderProps {
  size: number;
  extendSlides: number;
  offsetBy: number;
  children: JSX.Element[];
}

const useSlider = ({
  size,
  extendSlides,
  offsetBy,
  children: childrenProps,
}: useSliderProps) => {
  const controls = useAnimationControls();

  const sliderRef = useRef<HTMLDivElement>(null);

  // convert children to array
  const children = useMemo(
    () => Children.toArray(childrenProps),
    [childrenProps]
  );

  // set renderable elements
  const [slides, setSlides] = useState(
    extendArray(children, extendSlides <= 0 ? 1 : extendSlides).map(
      (child, index) => <Slide key={index}>{child}</Slide>
    )
  );

  // get relative position for centering the slider
  const position = useMemo(
    () => getSlideOffset(size, offsetBy),
    [size, offsetBy]
  );

  return {
    children,
    controls,
    slides,
    setSlides,
    position,
    sliderRef,
  };
};

export default useSlider;
