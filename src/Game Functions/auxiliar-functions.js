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
  [56],                             // CORNER BOTTOM LEFT
  [63],                             // CORNER BOTTOM RIGHT
  [0, 1, 2, 3, 4, 5, 6, 7],         // BORDER TOP
  [56, 57, 58, 59, 60, 61, 62, 63], // BORDER BOTTOM
  [0, 8, 16, 24, 32, 40, 48, 56],   // BORDER LEFT
  [7, 15, 23, 31, 39, 47, 55, 63]   // BORDER RIGHT
]


export const validCoord = coord => {
  const isValid = coord !== null
  const inBoard = coord > -1 && coord < 64
  return isValid && inBoard
}


export function updateCoords(directions, coord, board, isKing = false) {
  const LIMITS = BOARD_LIMITS
    .filter(limits => !limits.includes(coord))
    .flat()

  const INDEX = BOARD_LIMITS
    .findIndex(limits => limits.includes(coord))

  const DIRECTIONS = directions.at(INDEX)
  const NEW_COORDS = []

  DIRECTIONS.forEach(direction => {
    let nextCoord = coord

    while (
      !LIMITS.includes(nextCoord) &&
      board[nextCoord] === null ||
      coord === nextCoord
    ) {
      nextCoord += direction
      NEW_COORDS.push(nextCoord)
      if (isKing) { break }
    }
  })

  return NEW_COORDS
}


// MOVEMENTS REFERENCES

// VERTICAL       AVOBE: -8
// VERTICAL       BELOW: +8

// HORIZONTAL     LEFT:  -1
// HORIZONTAL     RIGHT: +1

// DIAGONAL LEFT  AVOBE: -9
// DIAGONAL LEFT  BELOW: +7
// DIAGONAL RIGHT AVOBE: -7
// DIAGONAL RIGHT BELOW: +9