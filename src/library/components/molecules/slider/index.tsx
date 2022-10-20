import { useContext } from "react";
import { NormalSlider } from "./sliders/normal-slider";
import SliderProvider, { SliderContext } from "./provider";
import { SnapToCenterAndInfiniteSlider } from "./sliders/snap-to-center-and-infinite-slider";

export interface SliderComponentProps {
  swipeConfidenceThreshold?: number;
  isInfinite?: boolean;
  snapToCenter?: boolean;
  extendSlides?: number;
  offsetBy?: number;
  children: JSX.Element[];
}

const Component = ({
  snapToCenter,
  isInfinite,
  ...props
}: SliderComponentProps) => {
  const { root } = useContext(SliderContext);

  return (
    <div
      ref={root}
      className="relative h-fit w-full overflow-hidden whitespace-nowrap"
    >
      {snapToCenter && isInfinite && (
        <SnapToCenterAndInfiniteSlider {...props} />
      )}
      {!snapToCenter && !isInfinite && <NormalSlider {...props} />}
      {!snapToCenter && isInfinite && <>under development</>}
      {snapToCenter && !isInfinite && <>under development</>}
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

Slider.defaultProps = {
  slideSize: 75,
  swipeConfidenceThreshold: 10000,
  extendSlides: 2,
  offsetBy: 1,
  isInfinite: true,
  snapToCenter: true,
};

export { Slider };
