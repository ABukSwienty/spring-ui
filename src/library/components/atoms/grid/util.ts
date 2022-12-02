import { CSSProperties } from "react";
import { FlexColProp } from ".";

const getFlexStyle = (flex: CSSProperties["flex"] | "auto" | FlexColProp) => {
  if (flex === "auto") {
    return "1 1 auto";
  }

  if (typeof flex === "number") {
    return `${flex} ${flex} auto`;
  }

  return flex;
};

export default getFlexStyle;
