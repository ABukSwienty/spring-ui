const getSlideOffset = (size: number, offsetByXElements: number = 0) => {
  const offset = size - (100 - size) / 2 + offsetByXElements * size;
  return {
    moveRight: -(size + offset),
    moveLeft: size - offset,
    offset: -offset,
  };
};

export default getSlideOffset;
