import b_bishop from '../assets/chess-pieces/b-bishop.png'
import w_bishop from '../assets/chess-pieces/w-bishop.png'
import { updateCoords } from './auxiliar-functions'


class Bishop {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.directions = [
      [9],           // CORNER TOP LEFT
      [8],           // CORNER TOP RIGHT
      [-7],          // CORNER BOTTOM LEFT
      [-9],          // CORNER BOTTOM RIGHT
      [7, 9],        // BORDER TOP
      [-9, -7],      // BORDER BOTTOM
      [-7, 9],       // BORDER LEFT
      [-9, 7],       // BORDER RIGHT
      [-9, -7, 7, 9] // DEFAULT
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