export const fillSquare = (board, piece, posit) => (
  [...board]
    .fill(piece, posit, posit + 1)
)


export const isIn = (obj, item) => obj?.includes(item)


const corners = [0, 7, 56, 63]


const edges = [
  [0, 1, 2, 3, 4, 5, 6, 7],         //Top
  [0, 8, 16, 24, 32, 40, 48, 56],   //Left
  [7, 15, 23, 31, 39, 47, 55, 63],  //Right
  [56, 57, 58, 59, 60, 61, 62, 63]  //Bottom
]

const allEdges = edges.flat()


const columns = [
  [0, 8, 16, 24, 32, 40, 48, 56],   //column A
  [1, 9, 17, 25, 33, 41, 49, 57],   //column B
  [6, 14, 22, 30, 38, 46, 54, 62],  //column G
  [7, 15, 23, 31, 39, 47, 55, 63]   //column H
]

export const column = pos => columns.findIndex(col => isIn(col, pos))



export const corner = (ext, moves) => {
  const cornerLimits = corners
    .filter(co => co !== ext)

  return [
    [ext],
    cornerLimits,
    moves
  ]
}


export const edge = (edg, moves) => {
  const edgeLimits = edges
    .filter((_, edge) => edge !== edg)
    .flat()

  return [
    edges[edg],
    edgeLimits,
    moves
  ]
}


export const innerQuadrant = (moves) => {
  const innerQ = Array(64)
    .fill(null)
    .map((_, qIdx) => qIdx)
    .filter(qCoord => !isIn(allEdges, qCoord))

  return [
    innerQ,
    allEdges,
    moves
  ]
}


export function updateCoords(ranges, pos, filledSquares) {
  const [, edges, moves] = ranges
    .find(ra => isIn(ra[0], pos))

  const limits = [...filledSquares, ...edges]
    .filter((limit, i, arr) => arr.indexOf(limit) === i && limit !== pos)
  // only keeps unique items and deletes the current position of the piece
  // this latter is necessary because otherwise newCoords will return an empty array []

  const newCoords = []

  moves.forEach(move => {
    let coord = pos

    while (!isIn(limits, coord)) {
      coord += move
      newCoords.push(coord)
    }
  })

  return newCoords
}


export const filterCoords = (moves, chessBoard, playerTurn) => {
  const ilegalCoords = chessBoard
    .map((sq, i) => sq?.name
      .startsWith(playerTurn) && i)
  // to colorize the legal moves it will not taken into account the coords where the player's pieces of the current color are

  return moves.filter(coord => !isIn(ilegalCoords, coord))
}