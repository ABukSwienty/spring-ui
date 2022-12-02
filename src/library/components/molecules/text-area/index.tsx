import { FC, useCallback, useRef, useState } from "react";
import { Flex, inputColors } from "../../..";
import useRefCallback from "../../../hooks/use-ref-callback";
import setClasses from "../../../util/set-classes";
import { InputText } from "../../atoms/input-texts";
import { Label } from "../../atoms/label";
import { CornerTip } from "../input/corner-tip";
import { InputIcon } from "../input/input-icon";

export interface TextAreaProps
  extends React.ComponentPropsWithoutRef<"textarea"> {
  label?: string;
  id?: string;
  name: string;
  color?: keyof typeof inputColors;
  error?: string;
  leadingIcon?: FC<React.ComponentProps<"svg">>;
  helperText?: string;
  cornerHint?: string;
  cornerElement?: React.ReactNode;
  cornerTip?: string;
  trailingIcon?: FC<React.ComponentProps<"svg">>;
  trailingElement?: React.ReactNode;
  resize?: keyof typeof textAreaResize;
}

const textAreaResize = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

export const TextArea = ({
  label,
  id,
  name,
  color = "brand",
  error,
  leadingIcon,
  helperText,
  cornerHint,
  cornerElement,
  cornerTip,
  className,
  trailingIcon,
  trailingElement,
  resize = "both",
  ...props
}: TextAreaProps) => {
  const [inputStyles, setInputStyles] = useState({});

  const classNames = setClasses([
    "peer w-full appearance-none rounded-md py-2 px-3 text-sm font-light ring-1 transition-shadow duration-150 ease-in-out focus:outline-none focus:ring-2 shadow-sm text-ellipsis",
    textAreaResize[resize],
    !error && "ring-gray-200",
    !error && inputColors[color],
    error && inputColors["error"] + " ring-error-500",
    className,
    props.disabled && "cursor-not-allowed bg-gray-100",
  ]);

  const handleLeading = useCallback(
    (node: HTMLElement | SVGSVGElement | null) => {
      if (node) {
        const { width } = node.getBoundingClientRect();
        setInputStyles((prev) => ({ ...prev, paddingLeft: width + 8 }));
      }
    },
    []
  );

  const handleTrailing = useCallback(
    (node: HTMLElement | SVGSVGElement | null) => {
      if (node) {
        const { width } = node.getBoundingClientRect();
        setInputStyles((prev) => ({ ...prev, paddingRight: width + 8 }));
      }
    },
    []
  );
  const { ref: trailingRef } = useRefCallback(handleTrailing);
  const { ref: leadingRef } = useRefCallback(handleLeading);
  return (
    <div className="group h-fit w-full">
      <Flex
        direction="row"
        align="end"
        justify="between"
        className={
          label || cornerHint || cornerElement || cornerTip ? "mb-1" : ""
        }
      >
        {label && (
          <Label
            htmlFor={id ? id : name}
            className="transition-colors duration-150 ease-in-out group-focus-within:text-gray-900"
          >
            {label}
          </Label>
        )}
        {cornerHint && <InputText variant="cornerHint">{cornerHint}</InputText>}
        {cornerElement && cornerElement}
        {cornerTip && <CornerTip tip={cornerTip} />}
      </Flex>
      <Flex className="relative h-full w-full" direction="row" align="center">
        {leadingIcon && (
          <InputIcon
            ref={leadingRef}
            color={color}
            icon={leadingIcon}
            className="pl-3"
            isError={!!error}
          />
        )}
        <textarea
          id={id ? id : name}
          name={name}
          style={inputStyles}
          className={classNames}
          {...props}
        ></textarea>
        {trailingIcon && (
          <InputIcon
            ref={trailingRef}
            color={color}
            icon={trailingIcon}
            className="right-0 pr-3"
            isError={!!error}
          />
        )}
        {trailingElement && (
          <div ref={trailingRef} className="absolute inset-y-0 right-0">
            {trailingElement}
          </div>
        )}
      </Flex>
      {error && (
        <InputText variant="error" className="mt-2 block">
          {error}
        </InputText>
      )}
      {helperText && !error && (
        <InputText className="mt-2 block">{helperText}</InputText>
      )}
    </div>
  );
};
