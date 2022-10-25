export const getSwipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
