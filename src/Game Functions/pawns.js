import b_pawn from '../assets/chess-pieces/b-pawn.png'
import w_pawn from '../assets/chess-pieces/w-pawn.png'
import { isIn } from './auxiliar-functions'


class Pawn {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.coords = null
    this.positions = []
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
  const { name, coords, positions: [pos] } = pawn
  const isBlack = isIn(name, 'B')

  const add = n => pos + n
  const sub = n => pos - n

  const moves = isBlack ?
    !coords ? [add(8), add(16)] : [add(8)] :
    !coords ? [sub(8), sub(16)] : [sub(8)]
  // if coords === null it means the Pawn is at its initial position, so it can move 2 squares

  const legalMoves = moves
    .filter(move => !isIn(filledSquares, move))
  // if another piece is on the way, this will restrict that vertical move

  const columns = [
    [0, 8, 16, 24, 32, 40, 48, 56],   //column A
    [7, 15, 23, 31, 39, 47, 55, 63]   //column H
  ]

  const column = columns
    .findIndex(col => isIn(col, pos))

  let eatingMoves;

  switch (column) {
    case 0: // column A
      eatingMoves = filledSquares
        .filter(sq => isBlack ? sq - pos === 9 : sub(sq) === 7)
      break
    case 1: // column H
      eatingMoves = filledSquares
        .filter(sq => isBlack ? sq - pos === 7 : sub(sq) === 9)
      break
    default:
      eatingMoves = filledSquares
        .filter(sq => isIn([7, 9], isBlack ? sq - pos : pos - sq))
  }

  return [...legalMoves, ...eatingMoves]
}


export const PAWNS = {
  B_PAWN_1: new Pawn('B_PAWN_1', b_pawn),
  B_PAWN_2: new Pawn('B_PAWN_2', b_pawn),
  B_PAWN_3: new Pawn('B_PAWN_3', b_pawn),
  B_PAWN_4: new Pawn('B_PAWN_4', b_pawn),
  B_PAWN_5: new Pawn('B_PAWN_5', b_pawn),
  B_PAWN_6: new Pawn('B_PAWN_6', b_pawn),
  B_PAWN_7: new Pawn('B_PAWN_7', b_pawn),
  B_PAWN_8: new Pawn('B_PAWN_8', b_pawn),

  W_PAWN_1: new Pawn('W_PAWN_1', w_pawn),
  W_PAWN_2: new Pawn('W_PAWN_2', w_pawn),
  W_PAWN_3: new Pawn('W_PAWN_3', w_pawn),
  W_PAWN_4: new Pawn('W_PAWN_4', w_pawn),
  W_PAWN_5: new Pawn('W_PAWN_5', w_pawn),
  W_PAWN_6: new Pawn('W_PAWN_6', w_pawn),
  W_PAWN_7: new Pawn('W_PAWN_7', w_pawn),
  W_PAWN_8: new Pawn('W_PAWN_8', w_pawn)
}