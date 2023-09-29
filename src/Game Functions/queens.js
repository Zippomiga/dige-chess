import b_queen from '../assets/chess-pieces/b-queen2.png'
import w_queen from '../assets/chess-pieces/w-queen22.png'
import { updateCoords } from './auxiliar-functions'


class Queen {
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
      board
    )
  }
}


export const QUEENS = {
  B_QUEEN: new Queen('B_QUEEN', b_queen),
  W_QUEEN: new Queen('W_QUEEN', w_queen)
}