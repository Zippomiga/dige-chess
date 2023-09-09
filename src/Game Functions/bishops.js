import b_bishop from '../assets/chess-pieces/b-bishop.png'
import w_bishop from '../assets/chess-pieces/w-bishop.png'
import { updateCoords } from './auxiliar-functions'


class Bishop {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.directions = [
      [9],           // CORNER_TOP_LEFT
      [8],           // CORNER_TOP_RIGHT
      [-7],          // CORNER_BOTTOM_LEFT
      [-9],          // CORNER_BOTTOM_RIGHT

      [7, 9],        // ROW_AVOBE
      [-9, -7],      // ROW_BOTTOM
      [-7, 9],       // COLUMN_LEFT
      [-9, 7],       // COLUMN_RIGHT

      [-8, -7, 7, 9] // DEFAULT
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


export const BISHOPS = {
  B_BISHOP_1: new Bishop('B_BISHOP_1', b_bishop),
  B_BISHOP_2: new Bishop('B_BISHOP_2', b_bishop),
  W_BISHOP_1: new Bishop('W_BISHOP_1', w_bishop),
  W_BISHOP_2: new Bishop('W_BISHOP_2', w_bishop)
}