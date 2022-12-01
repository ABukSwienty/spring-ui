import { FramerVariants } from "../types/framer-variants";
import setVariants from "../util/set-variants";

const VARIANTS: Partial<FramerVariants> = {
  initial: { opacity: 0, rotateX: -20, zIndex: 1, transformPerspective: 1000 },
  animate: {
    opacity: 1,
    rotateX: 0,
    transformPerspective: 1000,
  },
  exit: {
    opacity: 0,
    rotateX: -20,
    transition: { ease: "anticipate" },
    zIndex: 1,
  },
};

export const SWING_VARIANTS = setVariants([VARIANTS]);
