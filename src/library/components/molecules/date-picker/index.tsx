import {
  useFloating,
  offset,
  flip,
  shift,
  Placement,
} from "@floating-ui/react-dom";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { RefObject, useContext, useRef, useState } from "react";
import framerVariantProps from "../../../constants/framer-variant-props";
import useOnClickOutside from "../../../hooks/use-on-click-outside";
import { FramerVariants } from "../../../types/framer-variants";
import setClasses from "../../../util/set-classes";
import setVariants from "../../../util/set-variants";
import { Button } from "../../atoms/button/button";
import { Input, InputProps } from "../input";

import Decade from "./decade";
import Month from "./month";
import DatePickerProvider, {
  DatePickerContext,
  DatePickerProviderProps,
} from "./provider";
import Year from "./year";

export interface DatePickerComponentProps
  extends Omit<
    InputProps,
    | "onChange"
    | "value"
    | "onFocus"
    | "onBlur"
    | "icon"
    | "name"
    | "color"
    | "leadingIcon"
    | "leadingAddOn"
    | "leadingInlineAddOn"
  > {
  placement?: Placement;
  offset?: number;
}

export interface DatePickerProps extends DatePickerComponentProps {
  value: Date;
}

const VARIANTS: Partial<FramerVariants> = {
  initial: { opacity: 0, rotateX: -20 },
  animate: { opacity: 1, rotateX: 0 },
  exit: { opacity: 0, rotateX: -20, transition: { ease: "anticipate" } },
};

const variants = setVariants([VARIANTS]);

const Component = ({
  className,
  placement = "bottom",
  offset: offsetProps = 10,
  ...rest
}: DatePickerComponentProps) => {
  const { mode, dispatchSelections, displayValue, name, color } =
    useContext(DatePickerContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const handleToday = () => {
    dispatchSelections({ type: "today" });
    setShow(false);
  };

  const classNames = setClasses([className, "cursor-pointer"]);

  const { x, y, reference, floating, strategy, refs } = useFloating({
    strategy: "absolute",
    placement,
    middleware: [offset(offsetProps), flip(), shift()],
  });

  useOnClickOutside(refs.reference as RefObject<HTMLElement>, handleHide);

  return (
    <div ref={reference} className="perspective-2xl relative h-fit w-full">
      <Input
        {...rest}
        color={color}
        onFocus={handleShow}
        leadingIcon={CalendarIcon}
        name={name}
        value={displayValue.toDateString()}
        readOnly={true}
        className={classNames}
      />
      <AnimatePresence>
        {show && (
          <motion.div
            ref={floating}
            variants={variants}
            {...framerVariantProps}
            className="absolute z-50 mt-1 flex h-fit w-72 origin-[center_-50px] flex-col justify-between rounded-lg bg-white p-4 shadow-md"
            style={{
              left: x ?? 0,
              top: y ?? 0,
              position: strategy,
            }}
          >
            {mode === "month" && <Month handleHide={handleHide} />}
            {mode === "year" && <Year />}
            {mode === "decade" && <Decade />}
            <div className="mt-4 flex w-full items-center justify-center">
              <Button size="xs" color="dark" onClick={handleToday}>
                Today
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DatePicker = ({
  value,
  name,
  onChange,
  color,
  ...props
}: DatePickerProps & Omit<DatePickerProviderProps, "children">) => {
  return (
    <DatePickerProvider
      value={value}
      name={name}
      onChange={onChange}
      color={color}
    >
      <Component {...props} />
    </DatePickerProvider>
  );
};
