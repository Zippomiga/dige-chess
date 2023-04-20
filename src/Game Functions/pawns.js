import b_pawn from '../assets/chess-pieces/b-pawn.png'
import w_pawn from '../assets/chess-pieces/w-pawn.png'
import { clickedTwice, col, isIn } from './auxiliar-functions'


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
    console.log(this.coords)
  }
}


function updateCoords(isBlack, pos, init, filledSqrs) {
  const move = (bl, wh) => isBlack ? bl : wh
  const diff = (po, di) => po === di            // positional difference
  const filled = sqr => typeof sqr === 'number' // allow or disallow the vertical and diagonal moves

  const MOVES = (edge = false) => {
    return filledSqrs.map((sq, coord) => {
      const VERT = V => !filled(filledSqrs[V]) && V // prevents the pawn from 'jumping' or eating in vertical
      const one = VERT(move(pos + 8, pos - 8))
      const two = VERT(move(pos + 16, pos - 16))

      const VERTICAL = diff(init, pos) && one    // Read the reference below (1)
        ? isIn([one, two], coord)                // initial move
        : isIn([one], coord)                     // normal move

      const D = move(coord - pos, pos - coord)
      const DIAG = filled(sq) && D
      const column = { 'A': move(9, 7), 'H': move(7, 9) }[edge]

      const DIAGONAL = edge   // Read the reference below (2)
        ? diff(column, DIAG)  // at column A || H  
        : isIn([7, 9], DIAG)  // at column B || C || D || E || F || G

      return (VERTICAL || DIAGONAL) && coord
    }).filter(c => filled(c))
  }

  const newCoords = { 0: MOVES('A'), 3: MOVES('H') }

  return newCoords[col(pos)] || MOVES()
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
This will restrict the vertical moves depending of the position.
If the pawn is at initial position, it can move two squares, otherwise, it just can move one square.
The 'VERT' function will calculate if it is possible to make that moves in case the following vertical square is free or not.
*/

/* <--- (2) --->
This will restrict the diagonal moves depending on what column the pawn is, which in turn also depends of its color. If the pawn is black or white only can eat with a positional difference of...

COLUMN A: ... 9 or 7 respectively

COLUMN H: ... 7 or 9 respectively

COLUMN B || C || D || E || F || G:
it only will filter the moves by its color, with a positional difference of 7 or 9, or both, or none if the diagonal squares are not allowed to move
*/