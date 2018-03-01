export function getGridDimensions(gridWidth, gridHeight, hexNum) {
  const a = (6 * gridHeight) / (gridWidth * Math.sqrt(3));
  const b = (gridHeight / (2 * gridWidth)) - 2;

  const columns = Math.ceil((-b + Math.sqrt((b * b) + (4 * hexNum * a))) / (2 * a));

  const hexSize = Math.floor(gridWidth / ((3 * columns) + 0.5));

  return {
    columns,
    hexSize,
    hexWidth: hexSize * 2,
    hexHeight: Math.ceil(hexSize * Math.sqrt(3))
  };
}
