const getSlideOffset = (size: number, offsetBy: number = 0) => {
  const centralOffset = (100 - size) / 2;
  const offset = size * offsetBy - centralOffset;
  return {
    moveRight: -(size + offset),
    moveLeft: size - offset,
    offset: -offset,
    centralOffset,
  };
};

export default getSlideOffset;
