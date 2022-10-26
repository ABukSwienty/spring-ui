import { motion } from "framer-motion";

export const AppCardOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-20"
    />
  );
};
