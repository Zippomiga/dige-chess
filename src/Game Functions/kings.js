import b_king from '../assets/chess-pieces/b-king.png'
import w_king from '../assets/chess-pieces/w-king.png'
import { updateCoords, validCoord } from './auxiliar-functions'


class King {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.directions = [-9, -8, -7, -1, 1, 7, 8, 9]
  }

  getMoves(currentCoord, board) {
    const NEW_COORDS = updateCoords(
      this.directions,
      currentCoord,
      board,
      true // it's the king, then it only will iterate once
    )

    return NEW_COORDS.filter(validCoord)
  }
}


export const KINGS = {
  B_KING: new King('B_KING', b_king),
  W_KING: new King('W_KING', w_king)
}