import { useCallback, useContext } from "react";
import { FloatingInputItem } from "../floating/floating-input-item";
import { ComboBoxContextInterface, ComboBoxContext } from "./provider";

export interface ComboBoxItemProps {
  children: React.ReactNode;
  id: string;
  isCursor?: boolean;
  isDisabled: boolean;
}

export const ComboBoxItem = <
  ValueType extends string | number,
  Name extends string
>({
  id,
  isCursor,
  children,
  isDisabled,
}: ComboBoxItemProps) => {
  const {
    dispatch,
    state: { selectedOption },
  } = useContext<ComboBoxContextInterface<ValueType, Name>>(ComboBoxContext);

  const handleClick = useCallback(
    () => dispatch({ type: "select", id }),
    [dispatch, id]
  );

  return (
    <FloatingInputItem
      id={id}
      onClick={handleClick}
      isCursor={isCursor}
      isDisabled={isDisabled}
      isSelected={selectedOption?.id === id}
    >
      {children}
    </FloatingInputItem>
  );
};
