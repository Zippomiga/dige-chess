import b_pawn from '../assets/chess-pieces/b-pawn.png'
import w_pawn from '../assets/chess-pieces/w-pawn.png'
import { isIn } from './auxiliar-functions'


class Pawn {
  constructor(name, pic, initPos) {
    this.name = name
    this.pic = pic
    this.coords = null
    this.positions = []
    this.init = initPos
  }

  setPositions(pos) {
    this.positions.push(pos)
  }

  getPositions() {
    return this.positions
  }

  resetPositions() {
    this.positions = []
  }

  illegalMove() {
    return !isIn(this.coords, this.positions[1])
  }

  setCoords(filledSquares) {
    if (this.positions[1]) return // it runs only when player selects the piece

    this.coords = updateCoords(this, filledSquares)
    console.log(this.coords)
  }
}


function updateCoords(pawn, filledSquares) {
  const { name, positions: [pos], init } = pawn
  const B = isIn(name, 'B') // black pawn?
  const add = n => pos + n
  const sub = n => pos - n

  const verticalMoves = (B ?
    pos === init ? [add(8), add(16)] : [add(8)] :
    pos === init ? [sub(8), sub(16)] : [sub(8)])
    .filter(move => !isIn(filledSquares, move))
  // if another piece is on the way, this filter will restrict that vertical move

  const eatMoves = (atColumn, blackMov, whiteMov) => (
    filledSquares.filter(atColumn ?
      sq => B ? blackMov === -sub(sq) : whiteMov === sub(sq) :
      sq => isIn([7, 9], B ? -sub(sq) : sub(sq)))
  )

  const columns = [
    [0, 8, 16, 24, 32, 40, 48, 56],   //column A
    [7, 15, 23, 31, 39, 47, 55, 63]   //column H
  ]

  const column = columns.findIndex(col => isIn(col, pos))

  switch (column) {
    case 0: return [...verticalMoves, ...eatMoves(true, 9, 7)]
    case 1: return [...verticalMoves, ...eatMoves(true, 7, 9)]
    default: return [...verticalMoves, ...eatMoves(false)]
  }
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