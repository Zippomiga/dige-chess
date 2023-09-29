import b_king from '../assets/chess-pieces/b-king2.png'
import w_king from '../assets/chess-pieces/w-king22.png'
import { updateCoords } from './auxiliar-functions'


class King {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.directions = [
      [1, 8, 9],                   // CORNER TOP LEFT
      [-1, 7, 8],                  // CORNER TOP RIGHT
      [-8, -7, 1],                 // CORNER BOTTOM LEFT
      [-9, -8, -1],                // CORNER BOTTOM RIGHT
      [-1, 1, 7, 8, 9],            // BORDER TOP
      [-9, -8, -7, -1, 1],         // BORDER BOTTOM
      [-8, -7, 1, 8, 9],           // BORDER LEFT
      [-9, -8, -1, 7, 8],          // BORDER RIGHT
      [-9, -8, -7, -1, 1, 7, 8, 9] // DEFAULT
    ]
  }

  getMoves(currentCoord, board) {
    return updateCoords(
      this.directions,
      currentCoord,
      board,
      true // it's the king, then it will only iterate once
    )
  }
}


export const KINGS = {
  B_KING: new King('B_KING', b_king),
  W_KING: new King('W_KING', w_king)
}