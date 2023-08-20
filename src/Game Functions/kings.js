import b_king from '../assets/chess-pieces/b-king.png'
import w_king from '../assets/chess-pieces/w-king.png'
import { fixEdgeMovements, EDGES } from './auxiliar-functions'

class King {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.movements = [-9, -8, -7, -1, 1, 7, 8, 9]
  }

  getMoves(position, filledSquares = null) {
    return updateCoords(
      this.movements,
      position
    )
  }
}


function updateCoords(movements, position) {
  const fixedMovements = fixEdgeMovements(movements, position)
  const kingInEdge = EDGES.flat().includes(position)
  const MOVEMENTS = kingInEdge ? fixedMovements : movements

  return MOVEMENTS
    .map(movement => movement + position)
    .filter(coord => coord > -1 && coord < 64)
}


export const KINGS = {
  B_KING: new King('B_KING', b_king),
  W_KING: new King('W_KING', w_king)
}