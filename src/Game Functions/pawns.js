import b_pawn from '../assets/chess-pieces/b-pawn.png'
import w_pawn from '../assets/chess-pieces/w-pawn.png'
import { column, isIn } from './auxiliar-functions'


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

  setCoords(setMoves, filledSquares) {
    const { name, positions: [oldPos, newPos], init } = this

    if (newPos) return // it runs only when player selects the piece

    this.coords = updateCoords(
      name.startsWith('B'),
      oldPos,
      init,
      filledSquares,
    )

    setMoves(this.coords)
    console.log(this.coords)
  }
}


function updateCoords(isBlack, pos, init, filledSquares) {
  const add = n => pos + n
  const sub = n => pos - n

  const firstMove = pos === init && !filledSquares
    .find(sq => sq === (isBlack ? add(8) : sub(8)))
  // if another piece is in the way, this will prevent to the pawn from "jumping" that piece

  const verticalMoves = (isBlack ?
    firstMove ? [add(8), add(16)] : [add(8)] :
    firstMove ? [sub(8), sub(16)] : [sub(8)])
    .filter(move => !isIn(filledSquares, move))
  // if another piece is in the way, this will restrict that vertical move

  const eatMoves = (atEdgeColumn, b, w) => ( // (1)* Check out the reference below of all
    filledSquares.filter(atEdgeColumn ?
      sq => isBlack ? b === -sub(sq) : w === sub(sq) :
      sq => isIn([7, 9], isBlack ? -sub(sq) : sub(sq)))
  )

  const columns = [
    [0, 8, 16, 24, 32, 40, 48, 56],   //column A
    [7, 15, 23, 31, 39, 47, 55, 63]   //column H
  ]

  switch (column(columns, pos)) {
    case 0: return [...verticalMoves, ...eatMoves(true, 9, 7)] // column A
    case 1: return [...verticalMoves, ...eatMoves(true, 7, 9)] // column H
    default: return [...verticalMoves, ...eatMoves(false)]     // column B || C || D || E || F || G
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


/* (1)*
This filter will restrict the moves depending on what edge the pawn is, which in turn also depends of its color.

COLUMN A:
if the pawn is black, only can eat with a positional difference of 9.
if the pawn is white, only can eat with a positional difference of 7.

COLUMN H:
if the pawn is black, only can eat with a positional difference of 7.
if the pawn is white, only can eat with a positional difference of 9.

if the pawn is not at any edge, it only will filter the moves by its color, with a positional difference of 7 or 9, or both.
*/