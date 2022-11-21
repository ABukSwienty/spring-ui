import React from "react";
import setClasses from "../../../util/set-classes";

export interface AddOnProps {
  text: string;
  className?: string;
}

export const AddOn = React.forwardRef<HTMLDivElement, AddOnProps>(
  ({ text, className }, ref) => {
    const classNames = setClasses([
      "pointer-events-none absolute font-light inset-y-0 flex items-center text-sm text-gray-400 group-focus-within:text-gray-800 transition-colors duration-150 ease-in-out",
      className,
    ]);
    return (
      <div ref={ref} className={classNames}>
        {text}
      </div>
    );
  }
);
