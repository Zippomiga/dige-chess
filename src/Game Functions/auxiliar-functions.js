const sqrs = {
  corners: [0, 7, 56, 63],

  edges: [
    [0, 1, 2, 3, 4, 5, 6, 7],         //Top
    [0, 8, 16, 24, 32, 40, 48, 56],   //Left
    [7, 15, 23, 31, 39, 47, 55, 63],  //Right
    [56, 57, 58, 59, 60, 61, 62, 63]  //Bottom
  ],

  columns: [
    [0, 8, 16, 24, 32, 40, 48, 56],   //column A
    [1, 9, 17, 25, 33, 41, 49, 57],   //column B
    [6, 14, 22, 30, 38, 46, 54, 62],  //column G
    [7, 15, 23, 31, 39, 47, 55, 63]   //column H
  ]
}


const allEdges = sqrs.edges.flat()

export const col = pos => sqrs.columns.findIndex(co => co.includes(pos))


export const corner = (ext, moves) => {
  const cornerLimits = sqrs.corners
    .filter(co => co !== ext)

  return [
    [ext],
    cornerLimits,
    moves
  ]
}


export const edge = (edg, moves) => {
  const edgeLimits = sqrs.edges
    .filter((_, edge) => edge !== edg)
    .flat()

  return [
    sqrs.edges[edg],
    edgeLimits,
    moves
  ]
}


export const innerQuadrant = moves => {
  const innerQ = Array(64)
    .fill(null)
    .map((_, qIdx) => qIdx)
    .filter(qCoord => !allEdges.includes(qCoord))

  return [
    innerQ,
    allEdges,
    moves
  ]
}


export function updateCoords(ranges, pos, filledSquares) {
  const [, edges, moves] = ranges.find(ra => ra[0].includes(pos))

  const limits = [...filledSquares, ...edges]
    .filter((limit, i, arr) => {
      const uniq = arr.indexOf(limit) === i // keeps unique items
      const curr = limit !== pos            // prevents of newCoords from returning an empty array

      return uniq && curr
    })

  const newCoords = []

  moves.forEach(move => {
    let coord = pos

    while (!limits.includes(coord)) {
      coord += move
      newCoords.push(coord)
    }
  })

  return newCoords
}


// export function invalidPiece(piece, playerTurn) {
//   const noPiece = piece === null
//   const invalidPlayer = !piece?.name.startsWith(playerTurn)

//   return noPiece || invalidPlayer
// }

// export function invalidMove(piece, sqrPiece) {
//   const illegalMove = piece?.illegalMove()
//   const samePlayer = piece?.name[0] === sqrPiece?.name[0]

//   return illegalMove || samePlayer
// }