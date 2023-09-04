import b_queen from '../assets/chess-pieces/b-queen.png'
import w_queen from '../assets/chess-pieces/w-queen.png'
import { updateCoords, validCoord } from './auxiliar-functions'


class Queen {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.directions = [-9, -8, -7, -1, 1, 7, 8, 9]
  }

  getMoves(currentCoord, board) {
    const NEW_COORDS = updateCoords(
      this.directions,
      currentCoord,
      board
    )

    return NEW_COORDS.filter(validCoord)
  }
}


export const QUEENS = {
  B_QUEEN: new Queen('B_QUEEN', b_queen),
  W_QUEEN: new Queen('W_QUEEN', w_queen)
}