import b_bishop from '../assets/chess-pieces/b-bishop.png'
import w_bishop from '../assets/chess-pieces/w-bishop.png'
import { updateCoords } from './auxiliar-functions'


class Bishop {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.movements = [-9, -7, 7, 9]
  }

  getMoves(position, filledSquares) {
    return updateCoords(
      this.movements,
      position,
      filledSquares
    )
  }
}


export const BISHOPS = {
  B_BISHOP_1: new Bishop('B_BISHOP_1', b_bishop),
  B_BISHOP_2: new Bishop('B_BISHOP_2', b_bishop),
  W_BISHOP_1: new Bishop('W_BISHOP_1', w_bishop),
  W_BISHOP_2: new Bishop('W_BISHOP_2', w_bishop)
}