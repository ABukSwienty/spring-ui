import { FramerVariants } from "../types/framer-variants";

const setVariants = (variants: Partial<FramerVariants>): FramerVariants => {
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
  return Object.assign(defaultVariants, variants);
};

export default setVariants;
