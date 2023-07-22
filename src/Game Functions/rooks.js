import b_rook_png from '../assets/chess-pieces/b-rook.png'
import w_rook_png from '../assets/chess-pieces/w-rook.png'
import { corner, edge, innerQuadrant, updateCoords } from './auxiliar-functions'


class Rook {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
  }

  getMoves(position, filledSquares) {
    const RANGES = [
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

    return updateCoords(
      RANGES,
      position,
      filledSquares
    )
  }
}


export const ROOKS = {
  B_ROOK_1: new Rook('B_ROOK_1', b_rook_png),
  B_ROOK_2: new Rook('B_ROOK_2', b_rook_png),
  W_ROOK_1: new Rook('W_ROOK_1', w_rook_png),
  W_ROOK_2: new Rook('W_ROOK_2', w_rook_png),
}