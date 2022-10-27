import {
  AnimatePresence,
  DraggableProps,
  LayoutGroup,
  motion,
} from "framer-motion";
import { useEffect } from "react";
import { useRef } from "react";

import { useState } from "react";
import { getSwipePower } from "../../../util/get-swipe-power";
import setClasses from "../../../util/set-classes";
import { openSpring, closeSpring } from "./animations";
import { AppCardContainer } from "./container";
import { AppCardOverlay } from "./overlay";

export interface AppCardProps {
  containerClassName?: string;
  firstClassName?: string;
  lastClassName?: string;
  swipeToCloseThreshold?: number;
  borderRadius?: keyof typeof appCardBorders;
  firstChildren: (firstMount: boolean) => React.ReactNode;
  children: (
    isAnimationComplete: boolean,
    handleClose: () => void
  ) => React.ReactNode;
}

const appCardBorders = {
  none: 0,
  sm: 2,
  md: 6,
  lg: 8,
  xl: 12,
  "2xl": 16,
  "3xl": 24,
  full: 9999,
};

export const AppCard = ({
  containerClassName,
  firstClassName,
  lastClassName,
  swipeToCloseThreshold = 100,
  borderRadius = "none",
  firstChildren,
  children,
}: AppCardProps) => {
  const firstMount = useRef(true);
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

  useEffect(() => {
    if (firstMount.current) firstMount.current = false;
  }, []);

  const containerClassNames = setClasses([containerClassName, "relative"]);

  return (
    <>
      {<AnimatePresence>{isOpen && <AppCardOverlay />}</AnimatePresence>}

      <article onClick={handleOpen} className={containerClassNames}>
        <AppCardContainer isOpen={isOpen} isAnimating={isAnimating}>
          <LayoutGroup>
            <motion.div
              className={!isOpen ? firstClassName : lastClassName}
              layout={true}
              transition={isOpen ? openSpring : closeSpring}
              onLayoutAnimationComplete={handleAnimationComplete}
              drag={isOpen ? "y" : false}
              dragElastic={1}
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              whileTap={
                isOpen && isAnimationComplete ? { cursor: "grabbing" } : {}
              }
              style={{
                zIndex: isOpen || isAnimating ? 9999 : 0,
                cursor: isOpen && isAnimationComplete ? "grab" : "pointer",
              }}
              initial={{ borderRadius: appCardBorders[borderRadius] }}
            >
              <motion.div layout="position" className="relative h-full w-full">
                {!isOpen && !isAnimating && (
                  <>{firstChildren(firstMount.current)}</>
                )}
                {isOpen && <>{children(isAnimationComplete, handleClose)}</>}
              </motion.div>
            </motion.div>
          </LayoutGroup>
        </AppCardContainer>
      </article>
    </>
  );
};

export { AppCardProvider } from "./provider";
