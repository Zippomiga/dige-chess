export const fillSquare = (toFill, item, index) => (
  [...toFill].fill(item, index, index + 1)
)


export const idxEdges = [0, 1, 2, 3] //Top, Left, Right, Bottom


const edges = [
  [0, 1, 2, 3, 4, 5, 6, 7],         //Top
  [0, 8, 16, 24, 32, 40, 48, 56],   //Left
  [7, 15, 23, 31, 39, 47, 55, 63],  //Right
  [56, 57, 58, 59, 60, 61, 62, 63]  //Bottom
]


const allEdges = edges.flat()


const corners = [0, 7, 53, 63]


export const coords = {
  corner: (pos, moves) => {
    const cornerLimits = corners.filter(co => co !== pos)

    console.log(cornerLimits)

    return [pos, cornerLimits, moves]
  },

  edge: (edg, moves) => {
    const edgeLimits = edges.filter((_, i) => i !== edg).flat()

    return [edges[edg], edgeLimits, moves]
  },

  innerQuadrant: (moves) => {
    const innerQ = Array(64)
      .fill(null)
      .map((_, i) => i)
      .filter(qC => !allEdges.includes(qC))

    return [innerQ, allEdges, moves]
  },

  idx: (ranges, pos) => {
    return ranges.findIndex(range => range[0].includes(pos))
  }
}


export function updateCoords(pos, refs) {
  const [, limits, moves] = refs
  const coords = []

  moves.forEach(move => {
    let coord = pos

    while (!limits.includes(coord)) {
      coord += move
      coords.push(coord)
    }
  })

  return coords
}