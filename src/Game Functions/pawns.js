import b_pawn from '../assets/chess-pieces/b-pawn.png'
import w_pawn from '../assets/chess-pieces/w-pawn.png'
import { col, isIn, FREE } from './auxiliar-functions'


class Pawn {
  constructor(name, pic, init) {
    this.name = name
    this.pic = pic
    this.coords = null
    this.positions = []
    this.init = init
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

  getCoords() {
    return this.coords
  }

  setCoords(setMoves, filledSqrs) {
    const { name, positions: [pos, newPos], init } = this

    if (FREE(newPos)) return // it runs only when player selects the piece

    this.coords = updateCoords(
      name.startsWith('B'),
      pos,
      init,
      filledSqrs
    )

    setMoves(this.coords)
  }
}


function updateCoords(isBlack, pos, init, filled) {
  const PL = (bl, wh) => isBlack ? bl : wh

  return filled.map((sq, coord) => { // Read the reference below
    const V = v => PL(pos + v, pos - v)
    const D = PL(coord - pos, pos - coord)

    const VERT = (next = 8) => !FREE(filled.at(V(next))) && V(next)
    const DIAG = FREE(sq) && D

    const initial = init === pos && VERT()
    const atEdge = { 0: [9, 7], 3: [7, 9] }[col(pos)]

    const VERTICAL = initial
      ? isIn([VERT(), VERT(16)], coord)
      : isIn([VERT()], coord)

    const DIAGONAL = atEdge
      ? isIn([PL(...atEdge)], DIAG)
      : isIn([7, 9], DIAG)

    return (VERTICAL || DIAGONAL) && coord
  }).filter(n => FREE(n))
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


/*
'VERTICAL' will restrict the vertical moves depending of the position.
If the pawn is at initial position, it can move two squares, otherwise, it just can move one square.

'DIAGONAL' will restrict the diagonal moves depending on what column the pawn is, which in turn depends of its color. If the pawn is black or white, only can eat with a positional difference of...

COLUMN A: ... 9 or 7 respectively
COLUMN H: ... 7 or 9 respectively

COLUMN B || C || D || E || F || G:
It only will filter the moves by its color, with a positional difference of 7 or 9, both, or none if the diagonal squares are not allowed to move

In both cases, 'VERT' && 'DIAG' will handle if it's possible to make that moves in case the square is free or not, preventing the pawn from 'jumping' or eating in a wrong way.
*/