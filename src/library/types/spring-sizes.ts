export interface AllSpringSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
  "8xl": string;
  "9xl": string;
}

export interface SpringSizes
  extends Pick<AllSpringSizes, "xs" | "sm" | "md" | "lg" | "xl"> {}
