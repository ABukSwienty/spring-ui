const classes = ([...classes]: Array<string | undefined | null | boolean>) =>
  classes
    .filter((className) => typeof className === "string")
    .join(" ")
    .trim();

export default classes;
