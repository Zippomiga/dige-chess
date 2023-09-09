import b_queen from '../assets/chess-pieces/b-queen.png'
import w_queen from '../assets/chess-pieces/w-queen.png'
import { updateCoords } from './auxiliar-functions'


class Queen {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.directions = [
      [1, 8, 9],                    // CORNER_TOP_LEFT
      [-1, 7, 8],                   // CORNER_TOP_RIGHT
      [-8, -7, 1],                  // CORNER_BOTTOM_LEFT
      [-9, -8, -1],                 // CORNER_BOTTOM_RIGHT

      [-1, 1, 7, 8, 9],             // ROW_AVOBE
      [-9, -8, -7, -1, 1],          // ROW_BOTTOM
      [-8, -7, 1, 8, 9],            // COLUMN_LEFT
      [-9, -8, -1, 7, 8],           // COLUMN_RIGHT

      [-9, -8, -7, -1, 1, 7, 8, 9]  // DEFAULT
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


export const QUEENS = {
  B_QUEEN: new Queen('B_QUEEN', b_queen),
  W_QUEEN: new Queen('W_QUEEN', w_queen)
}