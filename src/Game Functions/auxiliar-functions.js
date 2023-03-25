export const fillSquare = (toFill, item, index) => (
  [...toFill].fill(item, index, index + 1)
)


export const isInCoords = (coord, pos) => coord.includes(pos)