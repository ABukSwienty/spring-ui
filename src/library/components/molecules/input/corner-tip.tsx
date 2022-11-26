import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip, TooltipTrigger, TooltipContent } from "../tooltip";

export const CornerTip = ({ tip }: { tip: string }) => (
  <Tooltip>
    <TooltipTrigger>
      <InformationCircleIcon className="h-5 w-5 cursor-pointer text-gray-500" />
    </TooltipTrigger>
    <TooltipContent>{tip}</TooltipContent>
  </Tooltip>
);
