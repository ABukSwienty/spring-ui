import { Variant, Variants } from "framer-motion";

export interface FramerVariants extends Variants {
  initial: Variant;
  animate: Variant;
  exit: Variant;
  hover: Variant;
  tap: Variant;
  drag: Variant;
  inView: Variant;
  focus: Variant;
}
