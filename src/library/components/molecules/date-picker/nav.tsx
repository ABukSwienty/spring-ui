import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../../atoms/button/button";
import { IconButton } from "../../atoms/icon-button";

export interface NavProps {
  navLeft: () => void;
  navRight: () => void;
  display: string;
  handleMode: () => void;
}

const Nav = ({ navLeft, navRight, display, handleMode }: NavProps) => {
  return (
    <div className="mb-4 flex h-fit w-full flex-row items-center justify-between">
      <IconButton
        size="sm"
        color="light"
        icon={ArrowLeftIcon}
        onClick={navLeft}
      />
      <Button size="sm" color="light" onClick={handleMode}>
        {display}
      </Button>
      <IconButton
        size="sm"
        color="light"
        icon={ArrowRightIcon}
        onClick={navRight}
      />
    </div>
  );
};

export default Nav;
