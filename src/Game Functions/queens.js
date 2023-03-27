import b_queen from '../assets/chess-pieces/b-queen.png'
import w_queen from '../assets/chess-pieces/w-queen.png'
import { isInCoords } from './auxiliar-functions'

const INIT_COORDS = {
  b_queen: null,
  w_queen: null,
}


const edges = [
  [0, 1, 2, 3, 4, 5, 6, 7],         //Top
  [0, 8, 16, 24, 32, 40, 48, 56],          //Left
  [7, 15, 23, 31, 39, 47, 55, 63],         //Right
  [56, 57, 58, 59, 60, 61, 62, 63], //Bottom
]

const opp = edg => edges.filter((_, i) => i !== edg).flat()

const innerQuadrant =
  Array(64).fill(null)
    .map((_, i) => i)
    .filter(qC => !edges.flat().includes(qC))


class Queen {
  constructor(name, pic, initCoords) {
    this.name = name
    this.pic = pic
    this.coords = initCoords
    this.moves = []
  }

  setMoves(pos) {
    this.moves.push(pos)
  }

  getMoves() {
    return this.moves
  }

  resetMoves() {
    this.moves = []
  }

  setNewCoords() {
    const pos = this.moves[1]

    const coords = [

      [[0], [7, 56, 63], [1, 8, 9]],
      [[7], [0, 56, 63], [-1, 7, 8]],
      [[56], [0, 7, 63], [-8, -7, 1]],
      [[63], [0, 7, 56], [-9, -8, -1]],

      [edges[0], opp(0), [-1, 1, 7, 8, 9]],
      [edges[1], opp(1), [-8, -7, 1, 8, 9]],
      [edges[2], opp(2), [-9, -8, -1, 7, 8]],
      [edges[3], opp(3), [-9, -8, -7, -1, 1]],

      [innerQuadrant, edges.flat(), [-9, -8, -7, -1, 1, 7, 8, 9]]

    ]

    const idx = coords.findIndex(coord => coord[0].includes(pos))

    // if (isInCoords(this.coords, pos)) {
    this.coords = updateQueenCoords(pos, coords[idx])
    // }

    this.resetMoves()
    console.log(this.coords)
  }
}


function updateQueenCoords(pos, refs) {
  const coords = []

  refs[2].forEach(ref => {
    let coord = pos

    while (!refs[1].includes(coord)) {
      coord += ref
      coords.push(coord)
    }
  })

  return coords
}


export const QUEENS = {
  B_QUEEN: new Queen('B_QUEEN', b_queen),
  W_QUEEN: new Queen('W_QUEEN', w_queen)
}