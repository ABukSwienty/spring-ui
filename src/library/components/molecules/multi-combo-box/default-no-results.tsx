import { useContext } from "react";
import { FloatingInputItem } from "../floating/floating-input-item";
import {
  MultiComboBoxContextInterface,
  MultiComboBoxContext,
} from "./provider";

const DefaultNoResults = <
  ValueType extends string | number,
  Name extends string
>() => {
  const {
    color,
    state: { inputValue },
  } =
    useContext<MultiComboBoxContextInterface<ValueType, Name>>(
      MultiComboBoxContext
    );

  return (
    <FloatingInputItem isClickable={false} className="text-sm" color={color}>
      No results match{" "}
      <span className="text-medium text-base">'{inputValue}'</span>
    </FloatingInputItem>
  );
};

export default DefaultNoResults;
