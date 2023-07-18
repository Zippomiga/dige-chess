import b_king from '../assets/chess-pieces/b-king.png'
import w_king from '../assets/chess-pieces/w-king.png'
import { FREE, corner, edge, innerQuadrant, isIn } from './auxiliar-functions'


class King {
  constructor(name, pic, initCheck) {
    this.name = name
    this.pic = pic
    this.positions = []
    this.check = initCheck
    this.coords = null
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

  setCoords(setMoves) {
    const { positions: [oldPos, newPos] } = this

    const ranges = [
      corner(0, [1, 8, 9]),         //TopLeft
      corner(7, [-1, 7, 8]),        //TopRight
      corner(56, [-8, -7, 1]),      //BottomLeft
      corner(63, [-9, -8, -1]),     //BottomRight

      edge(0, [-1, 1, 7, 8, 9]),    //Top
      edge(1, [-8, -7, 1, 8, 9]),   //Left
      edge(2, [-9, -8, -1, 7, 8]),  //Right
      edge(3, [-9, -8, -7, -1, 1]), //Bottom

      innerQuadrant([-9, -8, -7, -1, 1, 7, 8, 9])
    ]

    this.coords = updateCoords(ranges, oldPos)
    this.check = oldPos
    setMoves(this.coords)
  }
}

export function updateCoords(ranges, pos) {
  const [, , moves] = ranges
    .find(ra => isIn(ra[0], pos))

  return moves.map(move => move + pos)
}


export const KINGS = {
  B_KING: new King('B_KING', b_king, 4),
  W_KING: new King('W_KING', w_king, 60)
}