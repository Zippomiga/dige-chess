export const fillSquare = (board, piece, posit) => (
  [...board]
    .fill(piece, posit, posit + 1)
)


export const isIn = (obj, item) => obj.includes(item)


const corners = [0, 7, 56, 63]


const edges = [
  [0, 1, 2, 3, 4, 5, 6, 7],         //Top
  [0, 8, 16, 24, 32, 40, 48, 56],   //Left
  [7, 15, 23, 31, 39, 47, 55, 63],  //Right
  [56, 57, 58, 59, 60, 61, 62, 63]  //Bottom
]


const allEdges = edges.flat()


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

  const limits = [
    ...new Set([...filledSquares, ...edges])
  ].filter(limit => limit !== pos)
  // if another piece is on the way, this will restrict the range of movements

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