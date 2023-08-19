import b_queen from '../assets/chess-pieces/b-queen.png'
import w_queen from '../assets/chess-pieces/w-queen.png'
import { updateCoords } from './auxiliar-functions'


class Queen {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.movements = [-9, -8, -7, -1, 1, 7, 8, 9]
  }

  getMoves(position, filledSquares) {
    return updateCoords(
      this.movements,
      position,
      filledSquares
    )
  }
}


export const QUEENS = {
  B_QUEEN: new Queen('B_QUEEN', b_queen),
  W_QUEEN: new Queen('W_QUEEN', w_queen)
}