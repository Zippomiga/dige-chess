import b_king from '../assets/chess-pieces/b-king.png'
import w_king from '../assets/chess-pieces/w-king.png'
import { updateCoords } from './auxiliar-functions'


class King {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.directions = [
      [1, 8, 9],                   // CORNER_TOP_LEFT
      [-1, 7, 8],                  // CORNER_TOP_RIGHT
      [-8, -7, 1],                 // CORNER_BOTTOM_LEFT
      [-9, -8, -1],                // CORNER_BOTTOM_RIGHT

      [-1, 1, 7, 8, 9],            // ROW_AVOBE
      [-9, -8, -7, -1, 1],         // ROW_BOTTOM
      [-8, -7, 1, 8, 9],           // COLUMN_LEFT
      [-9, -8, -1, 7, 8],          // COLUMN_RIGHT
      
      [-9, -8, -7, -1, 1, 7, 8, 9] // DEFAULT
    ]
  }

  getMoves(currentCoord, board) {
    return updateCoords(
      this.directions,
      currentCoord,
      board,
      true // it's the king, then it only will iterate once
    )
  }
}


export const KINGS = {
  B_KING: new King('B_KING', b_king),
  W_KING: new King('W_KING', w_king)
}