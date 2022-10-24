import { motion, useInView } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { SliderContext } from "./provider";
const Slide = ({ children }: { children: React.ReactNode }) => {
  const { root, size } = useContext(SliderContext);
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const inView = useInView(ref, { amount: 0.95, root });

  useEffect(() => {
    /**
     * Debounce because the inView hook fires multiple times and will cause stuttering issues if we don't debounce
     * Especially problems when sliding left as inView will fire 4 times instead of just 2
     * More of a hot fix than a solution
     */
    const debounce = setTimeout(() => {
      setIsActive(inView);
    }, 50);

    return () => clearTimeout(debounce);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      animate={{
        scale: isActive ? 1 : 0.8,
        opacity: isActive ? 1 : 0.8,
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
