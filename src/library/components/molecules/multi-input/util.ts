import { InternalOption } from "./reducer";

export const uniqueOnly = (options: InternalOption[], option: InternalOption) =>
  options.find((o) => o.value === option.value)
    ? options
    : [...options, option];
