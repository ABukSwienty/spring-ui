import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useCallback, useMemo } from "react";
import { Colors } from "../../../types/colors";
import { ButtonGroup } from "../../atoms/button-group/button-group";
import { ButtonProps } from "../../atoms/button/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { getRange } from "./util";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  take?: number;
  onPageChange: (page: number) => void;
  showIcons?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  color?: ButtonProps["color"];
  showEllipsis?: boolean;
}

const activeColors: Colors = {
  brand: "!bg-brand-500",
  secondary: "!bg-brand-100",
  accent: "!bg-accent-500",
  success: "!bg-success-500",
  error: "!bg-error-500",
  warning: "!bg-warning-500",
  light: "!bg-gray-200",
  dark: "!bg-gray-500",
  none: "",
};

const PaginationPage = ({
  isActive,
  page,
  onClick,
  color,
}: {
  isActive: boolean;
  page: number;
  onClick: (page: number) => void;
  color: keyof Colors;
}) => {
  const handleClick = useCallback(() => onClick(page), [onClick, page]);
  return (
    <ButtonGroup.Button
      onClick={handleClick}
      className={isActive ? activeColors[color] : undefined}
      color={color}
      key={page}
    >
      {page}
    </ButtonGroup.Button>
  );
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showIcons = true,
  previousLabel = "Previous",
  nextLabel = "Next",
  take = 3,
  color = "light",
  showEllipsis = false,
}: PaginationProps) => {
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const renderables = useMemo(
    () => getRange(currentPage, take, pages),
    [currentPage, pages, take]
  );

  const finalVisiblePaginationPage = renderables[renderables.length - 1];
  const remainingPaginationPages = totalPages - finalVisiblePaginationPage;

  const shouldShowEllipsis = !(finalVisiblePaginationPage === totalPages);

  const handleNextPage = useCallback(
    () => onPageChange(Math.min(currentPage + 1, pages.length)),
    [currentPage, onPageChange, pages.length]
  );

  const handlePrevPage = useCallback(
    () => onPageChange(Math.max(currentPage - 1, 0)),
    [currentPage, onPageChange]
  );

  return (
    <ButtonGroup>
      <ButtonGroup.Button
        onClick={handlePrevPage}
        color={color}
        leadingIcon={showIcons ? ChevronLeftIcon : undefined}
      >
        {previousLabel}
      </ButtonGroup.Button>
      {renderables.map((page) => (
        <PaginationPage
          isActive={page === currentPage}
          page={page}
          onClick={onPageChange}
          color={color}
        />
      ))}
      {showEllipsis && shouldShowEllipsis && (
        <Tooltip>
          <TooltipTrigger>
            <div>
              <ButtonGroup.Button
                className="!rounded-none !border-r-0"
                color={color}
                disabled
              >
                ...
              </ButtonGroup.Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-sm">
              {remainingPaginationPages} pages left
            </span>
          </TooltipContent>
        </Tooltip>
      )}
      <ButtonGroup.Button
        onClick={handleNextPage}
        color={color}
        trailingIcon={showIcons ? ChevronRightIcon : undefined}
      >
        {nextLabel}
      </ButtonGroup.Button>
    </ButtonGroup>
  );
};
