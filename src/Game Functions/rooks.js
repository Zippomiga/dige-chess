import b_rook_png from '../assets/chess-pieces/b-rook.png'
import w_rook_png from '../assets/chess-pieces/w-rook.png'
import { updateCoords } from './auxiliar-functions'


class Rook {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.directions = [
      [1, 8],        // CORNER_TOP_LEFT
      [-1, 8],       // CORNER_TOP_RIGHT
      [-8, 1],       // CORNER_BOTTOM_LEFT
      [-8, -1],      // CORNER_BOTTOM_RIGHT

      [-1, 1, 8],    // ROW_AVOBE
      [-8, -1, 1],   // ROW_BOTTOM
      [-8, 1, 8],    // COLUMN_LEFT
      [-8, -1, 8],   // COLUMN_RIGHT

      [-8, -1, 1, 8] // DEFAULT
    ]
  }

  getMoves(currentCoord, board) {
    return updateCoords(
      this.directions,
      currentCoord,
      board
    )
  }
}


export const ROOKS = {
  B_ROOK_1: new Rook('B_ROOK_1', b_rook_png),
  B_ROOK_2: new Rook('B_ROOK_2', b_rook_png),
  W_ROOK_1: new Rook('W_ROOK_1', w_rook_png),
  W_ROOK_2: new Rook('W_ROOK_2', w_rook_png),
}