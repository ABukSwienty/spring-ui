import { motion, useInView } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { SliderContext } from "./provder";
const Slide = ({ children }: { children: React.ReactNode }) => {
  const { root, size } = useContext(SliderContext);
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const inView = useInView(ref, { amount: 0.95, root });

  useEffect(() => {
    setIsActive(inView);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      animate={{
        scale: isActive ? 1 : 0.8,
        opacity: isActive ? 1 : 0.5,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="inline-flex h-fit justify-center"
      style={{ width: size + "%", minWidth: size + "%" }}
    >
      {children}
    </motion.div>
  );
};

export default Slide;
