import { useContext } from "react";
import { NormalSlider } from "./sliders/normal-slider";
import SliderProvider, { SliderContext } from "./provider";
import { SnapToCenterAndInfiniteSlider } from "./sliders/snap-to-center-and-infinite-slider";
import { SnapToCenterSlider } from "./sliders/snap-to-center-slider";

export interface SliderComponentProps {
  swipeConfidenceThreshold?: number;
  mode: "snapToCenterAndInfinite" | "normal" | "snapToCenter";
  extendSlides?: number;
  offsetBy?: number;
  children: JSX.Element[];
}

const Component = ({ mode, ...props }: SliderComponentProps) => {
  const { root } = useContext(SliderContext);

  return (
    <div
      ref={root}
      className="relative h-fit w-full overflow-hidden whitespace-nowrap"
    >
      {mode === "snapToCenterAndInfinite" && (
        <SnapToCenterAndInfiniteSlider {...props} />
      )}
      {mode === "normal" && <NormalSlider {...props} />}
      {mode === "snapToCenter" && <SnapToCenterSlider {...props} />}
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
  mode: "snapToCenterAndInfinite",
};

export { Slider };
