import b_rook_png from '../assets/chess-pieces/b-rook.png'
import w_rook_png from '../assets/chess-pieces/w-rook.png'
import { coords, updateCoords } from './auxiliar-functions'


const INIT_COORDS = {
  b_rook1: [
    0, 1, 2, 3, 4, 5, 6, 7,
    8, 16, 24, 32, 40, 48, 56
  ],
  b_rook2: [
    7, 6, 5, 4, 3, 2, 1, 0,
    15, 23, 31, 39, 47, 55, 63
  ],
  w_rook1: [
    56, 57, 58, 59, 60, 61, 62,
    63, 48, 40, 32, 24, 16, 8, 0
  ],
  w_rook2: [
    63, 62, 61, 60, 59, 58, 57,
    56, 55, 47, 39, 31, 23, 15, 7
  ]
}


class Rook {
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
    const { corner, edge, innerQuadrant, idx } = coords

    const ranges = [
      corner(0, [1, 8]),
      corner(7, [-1, 8]),
      corner(56, [-8, 1]),
      corner(63, [-1, -8],),

      edge(0, [-1, 1, 8]),
      edge(1, [-8, 1, 8]),
      edge(2, [-8, -1, 8]),
      edge(3, [-1, 1, -8]),

      innerQuadrant([-8, -1, 1, 8])
    ]

    const range = idx(ranges, pos)
    this.coords = updateCoords(...range)

    this.resetMoves()
    console.log(this.coords)
  }
}


export const ROOKS = {
  B_ROOK_1: new Rook('B_ROOK_1', b_rook_png, INIT_COORDS.b_rook1),
  B_ROOK_2: new Rook('B_ROOK_2', b_rook_png, INIT_COORDS.b_rook2),
  W_ROOK_1: new Rook('W_ROOK_1', w_rook_png, INIT_COORDS.w_rook1),
  W_ROOK_2: new Rook('W_ROOK_2', w_rook_png, INIT_COORDS.w_rook2),
}