import b_pawn from '../assets/chess-pieces/b-pawn.png'
import w_pawn from '../assets/chess-pieces/w-pawn.png'
import { clickedTwice, col, isIn, RET } from './auxiliar-functions'


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

    if (clickedTwice(newPos)) return // it runs only when player selects the piece

    this.coords = updateCoords(
      name.startsWith('B'),
      pos,
      init,
      filledSqrs
    )

    setMoves(this.coords)
  }
}


function updateCoords(isBlack, pos, initial, filledSqrs) {
  const move = (bl, wh) => isBlack ? bl : wh
  const filled = sqr => typeof sqr === 'number' // allow or disallow the vertical and diagonal moves

  const MOVES = atEdge => {
    return filledSqrs.map((sq, coord) => {
      const VERT = v => !filled(filledSqrs[v]) && v
      const next = (n = 8) => VERT(move(pos + n, pos - n))
      const init = initial === pos && next()

      const DIAG = filled(sq) && move(coord - pos, pos - coord)
      const cols = { 'A': [9, 7], 'H': [7, 9] }
      const edge = move(...cols[atEdge] || [])

      const VERTICAL = RET(init, [next(), next(16)], [next()], coord) // Read the reference below (1)
      const DIAGONAL = RET(atEdge, [edge], [7, 9], DIAG)              // Read the reference below (2)

      return (VERTICAL || DIAGONAL) && coord
    }).filter(c => filled(c))
  }
  return { 0: MOVES('A'), 3: MOVES('H') }[col(pos)] || MOVES()
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
<--- (1) --->
This will restrict the vertical moves depending of the position.
If the pawn is at initial position, it can move two squares, otherwise, it just can move one square.
The 'VERT' function will handle if it is possible to make that moves in case the following vertical square is free or not, preventing the pawn from 'jumping' or eating in vertical.

<--- (2) --->
This will restrict the diagonal moves depending on what column the pawn is, which in turn depends of its color. If the pawn is black or white, only can eat with a positional difference of...

COLUMN A: ... 9 or 7 respectively
COLUMN H: ... 7 or 9 respectively

COLUMN B || C || D || E || F || G:
It only will filter the moves by its color, with a positional difference of 7 or 9, both, or none if the diagonal squares are not allowed to move
*/