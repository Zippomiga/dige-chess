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
    if (this.positions[1]) return // this makes the function runs once, only when player clicks for first time

    this.coords = updateCoords(this.name, this.positions, this.coords)
    console.log(this.coords)
  }
}

function updateCoords(name, positions, coords) {
  const [oldPos, newPos] = positions
  const isBlack = isIn(name, 'B')
  const firstMove = coords === null
  
  // const canEat = () => {
  //   const b_eatCoords = [9, 7]
  //   const w_eatCoords = [-9, -7]

  //   const calc = oldPos + newPos

  //   return isBlack && isIn(b_eatCoords, calc) || !isBlack && isIn(w_eatCoords, calc)
  // }

  if (firstMove) {
    return isBlack ?
      [oldPos + 8, oldPos + 16] :
      [oldPos - 8, oldPos - 16]
  } else {
    return isBlack ?
      [oldPos + 8] :
      [oldPos - 8]
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