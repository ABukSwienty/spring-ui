import { FramerVariants } from "../types/framer-variants";

const setVariants = ([...variants]: Array<
  Partial<FramerVariants> | undefined | boolean | null
>): FramerVariants => {
  const defaultVariants: FramerVariants = {
    initial: {},
    animate: {},
    exit: {},
    hover: {},
    tap: {},
    drag: {},
    inView: {},
    focus: {},
  };
  const variantsCopy = variants.filter(
    (variant) => typeof variant === "object"
  );
  return Object.assign(defaultVariants, ...variantsCopy);
};

export default setVariants;
