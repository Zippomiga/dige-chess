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
    const pos = this.positions[1]
    const blocked = this.coords.pop()

    return !isIn(this.coords, pos) || pos === blocked
  }

  setCoords(filledSquares) {
    if (this.positions[1]) return // this makes the function runs once, only when player clicks for first time

    this.coords = updateCoords(this.name, this.positions[0], this.coords, filledSquares)
    console.log(this.coords)
  }
}

function updateCoords(name, pos, coords, filledSquares) {
  const isBlack = isIn(name, 'B')
  const firstMove = coords === null
  const diff = [7, 9]

  const b = {
    canEat: filledSquares.filter(sq => isIn(diff, (sq - pos))),
    blocked: filledSquares.find(sq => sq === pos + 8),
  }

  const w = {
    canEat: filledSquares.filter(sq => isIn(diff, (pos - sq))),
    blocked: filledSquares.find(sq => sq === pos - 8),
  }

  const b_firstBlocked = b.blocked ?? pos + 16
  const w_firstBlocked = w.blocked ?? pos - 16

  if (firstMove) {
    return isBlack ?
      [pos + 8, b_firstBlocked, ...b.canEat, b.blocked] :
      [pos - 8, w_firstBlocked, ...w.canEat, w.blocked]
  } else {
    return isBlack ?
      [pos + 8, ...b.canEat, b.blocked] :
      [pos - 8, ...w.canEat, w.blocked]
  }
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