export const COLUMNS = [
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
  COLUMNS[0], // LEFT
  COLUMNS[7]  // RIGHT
]


export const findColumn = currentCoord => {
  return COLUMNS.findIndex(column => {
    return column.includes(currentCoord)
  })
}


export const validCoord = coord => {
  const isValid = coord !== null
  const inBoard = coord > -1 && coord < 64
  return isValid && inBoard
}


export function updateCoords(directions, currentCoord, filledSquares, isKing = false) {
  const fixedSquares = filledSquares.filter(square => square !== currentCoord)
  const restOfEdges = EDGES.filter(edge => !edge.includes(currentCoord)).flat()
  const pieceInEdge = EDGES.some(edge => edge.includes(currentCoord))

  const COLLISIONS = [...fixedSquares, ...restOfEdges]
  const NEW_COORDS = []

  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i]
    const fristCalc = direction + currentCoord
    const coordInContraryEdge = restOfEdges.includes(fristCalc)

    if (pieceInEdge && coordInContraryEdge) { continue }
    let newCoord = currentCoord

    while (!COLLISIONS.includes(newCoord)) {
      newCoord += direction
      NEW_COORDS.push(newCoord)
      if (!validCoord(newCoord) || isKing) { break }
    }
  }

  return NEW_COORDS.filter(validCoord)
}