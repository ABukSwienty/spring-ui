import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, Variants } from "framer-motion";
import React, { useCallback, useContext, useMemo } from "react";
import { Colors } from "../../../types/colors";
import setClasses from "../../../util/set-classes";
import { Badge } from "../../atoms/badge/badge";
import { IconButton } from "../../atoms/icon-button";
import { MultiComboBoxContext } from "./provider";
import { InternalInputOption } from "./types";

export interface MultiComboBoxContainerProps {
  children?: React.ReactNode;
  error?: string;
  className?: string;
  disabled?: boolean;
  isFilterable: boolean;
}

export const containerColors: Colors = {
  brand: "ring-brand-700",
  secondary: "ring-brand-400",
  accent: "ring-accent-700",
  success: "ring-success-500",
  error: "ring-error-500",
  warning: "ring-warning-500",
  light: "ring-gray-200",
  dark: "ring-gray-800",
  none: "",
};

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

const Option = <ValueType,>({
  onClick,

  option,
}: {
  onClick: (id: string) => void;

  children: React.ReactNode;
  option: InternalInputOption<ValueType>;
}) => {
  const { color, customBadges, pill } = useContext(MultiComboBoxContext);
  const handleClick = () => onClick(option.id);
  const renderable = customBadges.current ? (
    customBadges.current(option, handleClick)
  ) : (
    <motion.div variants={optionVariants} initial="initial" animate="animate">
      <Badge color={color} pill={pill}>
        {option.label}
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

export const MultiComboBoxContainer = ({
  children,
  error,
  className,
  disabled,
  isFilterable,
}: MultiComboBoxContainerProps) => {
  const {
    state: { selectedOptions, isOpen },
    color,
    dispatch,
  } = useContext(MultiComboBoxContext);

  const classNames = useMemo(
    () =>
      setClasses([
        "flex h-fit min-h-[36px] flex-wrap items-center w-full rounded-md py-1 px-3 text-sm font-light transition-shadow duration-150 ease-in-out shadow-sm gap-2",
        !isOpen && "ring-1",
        isOpen && "outline-none ring-2",
        !error && "ring-gray-200",
        isOpen && !error && containerColors[color],
        error && containerColors["error"] + " ring-error-500",
        className,
        disabled && "cursor-not-allowed bg-gray-100",
        isFilterable ? "cursor-text" : "cursor-pointer",
      ]),
    [color, className, disabled, error, isOpen, isFilterable]
  );

  const handleClick = () => {
    if (!disabled) dispatch({ type: "open" });
  };

  const handleDeselect = useCallback(
    (id: string) => dispatch({ type: "deSelect", id }),
    [dispatch]
  );

  const renderables = useMemo(() => {
    return selectedOptions.map((option) => (
      <Option key={option.id} option={option} onClick={handleDeselect}>
        {option.label}
      </Option>
    ));
  }, [selectedOptions, handleDeselect]);

  return (
    <div onClick={handleClick} className={classNames}>
      {renderables}
      {children}
    </div>
  );
};
