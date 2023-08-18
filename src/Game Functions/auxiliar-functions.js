const SQUARES = {
  CORNERS: [0, 7, 56, 63],

  EDGES: [
    [0, 1, 2, 3, 4, 5, 6, 7],         //Top
    [0, 8, 16, 24, 32, 40, 48, 56],   //Left
    [7, 15, 23, 31, 39, 47, 55, 63],  //Right
    [56, 57, 58, 59, 60, 61, 62, 63]  //Bottom
  ],

  COLUMNS: [
    [0, 8, 16, 24, 32, 40, 48, 56],   // A
    [1, 9, 17, 25, 33, 41, 49, 57],   // B
    [2, 10, 18, 26, 34, 42, 50, 58],  // C
    [3, 11, 19, 27, 35, 43, 51, 59],  // D
    [4, 12, 20, 28, 36, 44, 52, 60],  // E
    [5, 13, 21, 29, 37, 45, 53, 61],  // F
    [6, 14, 22, 30, 38, 46, 54, 62],  // G
    [7, 15, 23, 31, 39, 47, 55, 63]   // H
  ]
}


const ALL_EDGES = SQUARES.EDGES.flat()

export const column = position => {
  return SQUARES.COLUMNS
    .findIndex(co => co.includes(position))
}

export const corner = (corner, moves) => {
  const cornerLimits = SQUARES.CORNERS
    .filter(co => co !== corner)

  return [
    [corner],
    cornerLimits,
    moves
  ]
}

export const edge = (edge, moves) => {
  const edgeLimits = SQUARES.EDGES
    .filter((_, ed) => ed !== edge)
    .flat()

  return [
    SQUARES.EDGES[edge],
    edgeLimits,
    moves
  ]
}

export const innerQuadrant = moves => {
  const innerQ = Array(64)
    .fill(null)
    .map((_, qIdx) => qIdx)
    .filter(qCoord => !ALL_EDGES.includes(qCoord))

  return [
    innerQ,
    ALL_EDGES,
    moves
  ]
}

export function updateCoords(ranges, position, filledSquares) {
  const ARR = ranges.find(ra => ra[0].includes(position))
  const [, EDGES, MOVES] = ARR

  const LIMITS = [...filledSquares, ...EDGES]
    .filter((limit, i, arr) => {
      const uniques = arr.indexOf(limit) === i 
      const current = limit !== position // prevents of newCoords from returning an empty array

      return uniques && current
    })

  const NEW_COORDS = []

  MOVES.forEach(move => {
    let coord = position

    while (!LIMITS.includes(coord)) {
      coord += move
      NEW_COORDS.push(coord)
    }
  })

  return NEW_COORDS
}