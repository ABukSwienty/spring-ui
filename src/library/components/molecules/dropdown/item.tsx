import { useContext } from "react";
import { DropdownContext } from ".";
import setClasses from "../../../util/set-classes";

export interface DropDownMenuItemProps
  extends React.ComponentPropsWithoutRef<"li"> {}
export const DropdownMenuItem = ({
  className,
  children,
  ...rest
}: DropDownMenuItemProps) => {
  const { handleClose, dismissOnClick } = useContext(DropdownContext);
  const classNames = setClasses([
    "py-2.5 px-2 transition-colors duration-300 ease-in-out hover:bg-gray-200",
    className,
  ]);

  const clickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    if (dismissOnClick) handleClose();
    if (rest.onClick) rest.onClick(e);
  };
  return (
    <li onClick={clickHandler} className={classNames}>
      {children}
    </li>
  );
};
