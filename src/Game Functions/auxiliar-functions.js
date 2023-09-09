import { CHESS_BOARD } from "./board"

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

const BOARD_LIMITS = [
  [0],                              // CORNER TOP LEFT
  [7],                              // CORNER TOP RIGHT
  [57],                             // CORNER BOTTOM LEFT
  [60],                             // CORNER BOTTOM RIGHT
  [0, 1, 2, 3, 4, 5, 6, 7],         // ROW AVOBE
  [56, 57, 58, 59, 60, 61, 62, 63], // ROW BOTTOM
  [0, 8, 16, 24, 32, 40, 48, 56],   // COLUMN LEFT
  [7, 15, 23, 31, 39, 47, 55, 56]   // COLUMN RIGHT
]


const BORDER_ROWS = [
  BOARD_LIMITS[4],
  BOARD_LIMITS[5],
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


export const getCoordToReplace = currentBoard => {
  return currentBoard.findIndex((piece, coord) => {
    const inEdge = BORDER_ROWS.some(border => border.includes(coord))
    const isPawn = piece?.name.includes('PAWN')
    return inEdge && isPawn
  })
}


export const getPieceToReplace = pieceName => {
  return CHESS_BOARD.find(piece => piece?.name === pieceName)
}


export function updateCoords(directions, currentCoord, board, isKing = false) {
  const LIMITS = BOARD_LIMITS
    .filter(limit => !limit.includes(currentCoord))

  const INDEX = BOARD_LIMITS
    .findIndex(limit => limit.includes(currentCoord))

  const DIRECTIONS = directions.at(INDEX)
  const NEW_COORDS = []

  DIRECTIONS.forEach(direction => {
    let newCoord = currentCoord

    while (
      !LIMITS.some(limit => limit.includes(newCoord)) &&
      board[newCoord] === null ||
      currentCoord === newCoord
    ) {
      newCoord += direction
      NEW_COORDS.push(newCoord)
      if (isKing) { break }
    }
  })

  return NEW_COORDS
}