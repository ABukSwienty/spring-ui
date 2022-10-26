import { AnimatePresence, DraggableProps, motion } from "framer-motion";
import { useState } from "react";
import { getSwipePower } from "../../../util/get-swipe-power";
import setClasses from "../../../util/set-classes";
import { openSpring, closeSpring } from "./animations";
import { AppCardContainer } from "./container";
import { AppCardOverlay } from "./overlay";

export interface AppCardProps {
  wrapperClassName?: string;
  cardClassName?: string;
  isOpenClassName?: string;
  openWidth?: number;
  openHeight?: number;
  swipeToCloseThreshold?: number;
  children: (
    isOpen: boolean,
    isAnimationComplete: boolean,
    handleClose: () => void
  ) => React.ReactNode;
}

export const AppCard = ({
  wrapperClassName,
  cardClassName,
  isOpenClassName,
  openWidth = 400,
  openHeight = 600,
  swipeToCloseThreshold = 100,
  children,
}: AppCardProps) => {
  const [{ isOpen, isAnimationComplete, isOpenable, isAnimating }, setState] =
    useState({
      isOpen: false,
      isOpenable: true,
      isAnimationComplete: false,
      isAnimating: false,
    });

  const handleOpen = () => {
    if (!isOpenable) return;
    setState({
      isOpen: true,
      isOpenable: false,
      isAnimationComplete: false,
      isAnimating: true,
    });
  };

  const handleClose = () =>
    setState((prev) => ({ ...prev, isOpen: false, isAnimating: true }));

  const handleDragEnd: DraggableProps["onDragEnd"] = (
    e,
    { offset, velocity }
  ) => {
    const swipe = getSwipePower(offset.x, velocity.x);
    if (swipe > swipeToCloseThreshold || swipe < -swipeToCloseThreshold) {
      handleClose();
    }
  };

  const handleAnimationComplete = () => {
    setState((prev) => {
      if (prev.isOpen) {
        return {
          ...prev,
          isAnimationComplete: true,
          isAnimating: false,
        };
      } else {
        return {
          ...prev,
          isAnimationComplete: false,
          isOpenable: true,
          isAnimating: false,
        };
      }
    });
  };

  const wrapperClassNames = setClasses([wrapperClassName, "relative"]);

  return (
    <>
      <AnimatePresence>{isOpen && <AppCardOverlay />}</AnimatePresence>
      <motion.article
        onClick={handleOpen}
        className={`${wrapperClassNames} ${
          isOpen ? "cursor-grab" : "cursor-pointer"
        }`}
      >
        <AppCardContainer isOpen={isOpen} isAnimating={isAnimating}>
          <motion.div
            layout={true}
            className={
              !isOpen && !isAnimating ? cardClassName : isOpenClassName
            }
            animate={
              isOpen
                ? {
                    width: openWidth,
                    height: openHeight,
                  }
                : {}
            }
            transition={isOpen ? openSpring : closeSpring}
            onAnimationComplete={handleAnimationComplete}
            drag={isOpen ? "y" : false}
            dragElastic={1}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            style={isAnimating || isOpen ? { z: 9999 } : {}}
          >
            {children(isOpen, isAnimationComplete, handleClose)}
          </motion.div>
        </AppCardContainer>
      </motion.article>
    </>
  );
};
