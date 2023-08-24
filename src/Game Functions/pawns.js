import b_pawn from '../assets/chess-pieces/b-pawn.png'
import w_pawn from '../assets/chess-pieces/w-pawn.png'
import { findColumn, validCoord } from './auxiliar-functions'


class Pawn {
  constructor(name, pic, initialCoord) {
    this.name = name
    this.pic = pic
    this.initialCoord = initialCoord
  }

  getMoves(currentCoord, filledSquares) {
    return updateCoords(
      this.name.startsWith('W'),
      this.initialCoord === currentCoord,
      currentCoord,
      filledSquares
    ).filter(validCoord)
  }
}


function updateCoords(isWhite, initialMove, currentCoord, filledSquares) {
  return filledSquares.map((square, coord) => {
    const FREE = (nextSquare = square) => nextSquare === null
    const NEXT = diff => isWhite ? currentCoord - diff : currentCoord + diff
    const EDGE = edge => findColumn(currentCoord) === edge

    const VERT_NEXT = FREE(filledSquares[NEXT(8)])
    const DIAG_NEXT = [NEXT(7), NEXT(9)]
    
    const VERT_COORDS = VERT_NEXT && initialMove
      ? [NEXT(8), NEXT(16)]
      : [NEXT(8)]

    const DIAG_COORDS =
      EDGE(0) ? [Math.max(...DIAG_NEXT)] : // COLUMN A
      EDGE(7) ? [Math.min(...DIAG_NEXT)] : // COLUMN H
      DIAG_NEXT

    const VERTICAL = VERT_COORDS.includes(coord) && FREE()
    const DIAGONAL = DIAG_COORDS.includes(coord) && !FREE()

    return VERTICAL || DIAGONAL ? coord : null
  })
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