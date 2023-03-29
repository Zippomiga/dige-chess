export const fillSquare = (toFill, item, index) => (
  [...toFill].fill(item, index, index + 1)
)


const corners = [0, 7, 56, 63]

const edges = [
  [0, 1, 2, 3, 4, 5, 6, 7],         //Top
  [0, 8, 16, 24, 32, 40, 48, 56],   //Left
  [7, 15, 23, 31, 39, 47, 55, 63],  //Right
  [56, 57, 58, 59, 60, 61, 62, 63]  //Bottom
]

const allEdges = edges.flat()


export const coords = {
  corner: (ext, moves) => {
    const cornerLimits = corners.filter(co => co !== ext)
    
    return [[ext], cornerLimits, moves]
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
    const refs = ranges.find(ra => ra[0].includes(pos))
    
    return [refs, pos]
  }
}


export function updateCoords(refs, pos) {
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