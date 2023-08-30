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


const getRestOfEdges = coord => {
  const EDGES = [COLUMNS[0], COLUMNS[7]] // LEFT - RIGHT
  return EDGES.filter(edge => !edge.includes(coord))
}


const fixDirections = (directions, currentCoord) => {
  const restOfEdges = getRestOfEdges(currentCoord)

  return directions.filter(direction => {
    const firstCalc = direction + currentCoord
    return restOfEdges.some(edge => !edge.includes(firstCalc))
  })
}


const notCollide = (currentCoord, newCoord, board) => {
  const restOfEdges = getRestOfEdges(currentCoord)
  const isNotInEdge = restOfEdges.every(edge => !edge.includes(newCoord))
  const isNotFilled = board[newCoord] === null
  const isSameCoord = currentCoord === newCoord

  return isNotInEdge && isNotFilled || isSameCoord
}


export function updateCoords(directions, currentCoord, board, isKing = false) {
  const DIRECTIONS = fixDirections(directions, currentCoord)
  const NEW_COORDS = []

  DIRECTIONS.forEach(direction => {
    let newCoord = currentCoord

    while (notCollide(currentCoord, newCoord, board)) {
      newCoord += direction
      NEW_COORDS.push(newCoord)
      if (isKing) { break }
    }
  })

  return NEW_COORDS.filter(validCoord)
}