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

  setCoords(setMoves, filledSqrs) {
    const { name, positions: [pos, newPos], init } = this

    if (newPos) return // it runs only when player selects the piece

    this.coords = updateCoords(
      name.startsWith('B'),
      pos,
      init,
      filledSqrs,
    )

    setMoves(this.coords)
    console.log(this.coords)
  }
}


function updateCoords(isBlack, pos, init, filledSqrs) {
  const player = (bl, wh) => isBlack ? bl : wh
  const diff = (po, di) => po === di // positional difference

  const vertical = () => {
    const freeSqr = vM => { // if another piece is in the way, this will restrict the vertical moves
      const vert = player(pos + vM, pos - vM)
      const next = filledSqrs.find(sq => diff(sq, vert))
      const free = typeof next === 'undefined' // this prevents errors with the 'zero' position

      return free && vert
    }

    const oneSqr = freeSqr(8)
    const twoSqr = freeSqr(16)
    const initial = diff(pos, init) && oneSqr

    return initial ? [oneSqr, twoSqr] : [oneSqr]
  }

  const diagonal = (atEdge, bl, wh) => { // (1) Read the reference below
    return filledSqrs.filter(sq => {
      const eMov = player(-(pos - sq), pos - sq)
      const eDif = player(bl, wh)

      const edge = diff(eMov, eDif)
      const qdrt = isIn([7, 9], eMov)

      return atEdge ? edge : qdrt
    })
  }

  const moves = (...args) => [...vertical(), ...diagonal(...args)]

  switch (column(pos)) {
    case 0: return moves(true, 9, 7) // column A
    case 3: return moves(true, 7, 9) // column H
    default: return moves(false)     // column B || C || D || E || F || G
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


/* <--- (1) --->
This filter will restrict the moves depending on what edge the pawn is, which in turn also depends of its color.

COLUMN A:
if the pawn is black or white, only can eat with a positional difference of 9 or 7 respectively

COLUMN H:
if the pawn is black or white, only can eat with a positional difference of 7 or 9 respectively

if the pawn is not at any edge, it only will filter the moves by its color, with a positional difference of 7 or 9, or both.
*/