import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, Variants } from "framer-motion";
import { useCallback, useContext } from "react";
import { containerColors } from ".";
import { Sizes } from "../../../types/sizes";
import { Badge } from "../../atoms/badge/badge";
import { IconButton } from "../../atoms/icon-button";
import { MultiInputContext } from "./provider";

const optionVariants: Variants = {
  initial: {
    opacity: 0,
    x: -10,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

export const MultiInputOption = ({
  id,
  value,
  onClick,
  color,
  pill,
  size,
}: {
  id: string;
  value: string;
  onClick: (id: string) => void;
  color: keyof typeof containerColors;
  pill: boolean;
  size: keyof Sizes;
}) => {
  const { customBadges } = useContext(MultiInputContext);
  const handleClick = useCallback(() => onClick(id), [id, onClick]);
  const renderable = customBadges.current ? (
    customBadges.current({ id, value }, handleClick)
  ) : (
    <motion.div variants={optionVariants} initial="initial" animate="animate">
      <Badge color={color} pill={pill} size={size}>
        {value}
        <IconButton
          size="xs"
          color="none"
          icon={XMarkIcon}
          tooltip="clear option"
          className="ml-3"
          onClick={handleClick}
        />
      </Badge>
    </motion.div>
  );
  return renderable as JSX.Element;
};
