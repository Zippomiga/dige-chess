import b_pawn from '../assets/chess-pieces/b-pawn.png'
import w_pawn from '../assets/chess-pieces/w-pawn.png'
import { column } from './auxiliar-functions'


class Pawn {
  constructor(name, pic, init) {
    this.name = name
    this.pic = pic
    this.init = init
  }

  getMoves(position, filledSquares) {
    return updateCoords(
      this.name.startsWith('W'),
      this.init === position,
      position,
      filledSquares
    )
  }
}



function updateCoords(isWhite, initial, position, filledSquares) {
  return filledSquares.map((square, move) => {
    const NEXT = diff => isWhite ? position - diff : position + diff
    const EDGE = columnIndex => column(position) === columnIndex
    const FREE = square === null

    const VERT_NEXT = initial && filledSquares[NEXT(8)] === null
    const DIAG_NEXT = isWhite
      ? [NEXT(7), NEXT(9)]
      : [NEXT(9), NEXT(7)]

    const VERT_MOVES = VERT_NEXT
      ? [NEXT(8), NEXT(16)]
      : [NEXT(8)]

    const DIAG_MOVES =
      EDGE(0) ? [Math.max(...DIAG_NEXT)] : // COLUMN A
      EDGE(7) ? [Math.min(...DIAG_NEXT)] : // COLUMN H
      DIAG_NEXT

    const VERTICAL = FREE && VERT_MOVES.includes(move)
    const DIAGONAL = !FREE && DIAG_MOVES.includes(move)

    return VERTICAL || DIAGONAL ? move : null
  }).filter(coord => coord !== null)
}


export const PAWNS = {
  B_PAWN_1: new Pawn('B_PAWN_1', b_pawn, 8),
  B_PAWN_2: new Pawn('B_PAWN_2', b_pawn, 9),
  B_PAWN_3: new Pawn('B_PAWN_3', b_pawn, 10),
  B_PAWN_4: new Pawn('B_PAWN_4', b_pawn, 11),
  B_PAWN_5: new Pawn('B_PAWN_5', b_pawn, 12),
  B_PAWN_6: new Pawn('B_PAWN_6', b_pawn, 13),
  B_PAWN_7: new Pawn('B_PAWN_7', b_pawn, 14),
  B_PAWN_8: new Pawn('B_PAWN_8', b_pawn, 15),

  W_PAWN_1: new Pawn('W_PAWN_1', w_pawn, 48),
  W_PAWN_2: new Pawn('W_PAWN_2', w_pawn, 49),
  W_PAWN_3: new Pawn('W_PAWN_3', w_pawn, 50),
  W_PAWN_4: new Pawn('W_PAWN_4', w_pawn, 51),
  W_PAWN_5: new Pawn('W_PAWN_5', w_pawn, 52),
  W_PAWN_6: new Pawn('W_PAWN_6', w_pawn, 53),
  W_PAWN_7: new Pawn('W_PAWN_7', w_pawn, 54),
  W_PAWN_8: new Pawn('W_PAWN_8', w_pawn, 55)
}