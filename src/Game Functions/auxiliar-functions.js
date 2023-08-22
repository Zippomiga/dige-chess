const ROWS = [
  [0, 1, 2, 3, 4, 5, 6, 7],         // A
  [8, 9, 10, 11, 12, 13, 14, 15],   // B
  [16, 17, 18, 19, 20, 21, 22, 23], // C
  [24, 25, 26, 27, 28, 29, 30, 31], // D
  [32, 33, 34, 35, 36, 37, 38, 39], // E
  [40, 41, 42, 43, 44, 45, 46, 47], // F
  [48, 49, 50, 51, 52, 53, 54, 55], // G
  [56, 57, 58, 59, 60, 61, 62, 63]  // H
]

const COLUMNS = [
  [0, 8, 16, 24, 32, 40, 48, 56],   // A
  [1, 9, 17, 25, 33, 41, 49, 57],   // B
  [2, 10, 18, 26, 34, 42, 50, 58],  // C
  [3, 11, 19, 27, 35, 43, 51, 59],  // D
  [4, 12, 20, 28, 36, 44, 52, 60],  // E
  [5, 13, 21, 29, 37, 45, 53, 61],  // F
  [6, 14, 22, 30, 38, 46, 54, 62],  // G
  [7, 15, 23, 31, 39, 47, 55, 63]   // H
]


const EDGES = [
  ROWS[0],    // TOP
  ROWS[7],    // BOTTOM
  COLUMNS[0], // LEFT
  COLUMNS[7], // RIGHT
]


export const findColumn = position => {
  return COLUMNS
    .findIndex(column => column.includes(position))
}


export const validCoord = coord => {
  return coord !== null && coord > -1 && coord < 64
}


export function updateCoords(movements, position, filledSquares, isKing = false) {
  const restOfEdges = EDGES.filter(edge => !edge.includes(position))
  const pieceInEdge = EDGES.some(edge => edge.includes(position))

  const LIMITS = [filledSquares, restOfEdges]
    .flat(2)
    .filter(square => square !== position)

  const NEW_COORDS = []

  for (let i = 0; i < movements.length; i++) {
    const movement = movements[i];
    const firstCalc = movement + position
    const firstMustBeIgnored = restOfEdges.some(edge => edge.includes(firstCalc))

    if (pieceInEdge && firstMustBeIgnored) { continue }
    let coord = position

    while (!LIMITS.includes(coord)) {
      coord += movement
      NEW_COORDS.push(coord)

      if (isKing || coord < 0 || coord > 63) {
        break
      }
    }
  }

  return NEW_COORDS.filter(validCoord)
}