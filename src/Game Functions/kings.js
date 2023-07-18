import b_king from '../assets/chess-pieces/b-king.png'
import w_king from '../assets/chess-pieces/w-king.png'
import { corner, edge, innerQuadrant } from './auxiliar-functions'


const RANGES = [
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


class King {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
    this.positions = []
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
    return !this.coords.includes(this.positions[1])
  }

  checkCheck() { return }

  setCoords(setMoves) {
    this.coords = updateCoords(RANGES, this.positions[0])

    setMoves(this.coords)
  }
}

export function updateCoords(ranges, pos) {
  const [, , moves] = ranges
    .find(ra => ra[0].includes(pos))

  return moves.map(move => move + pos)
}


export const KINGS = {
  B_KING: new King('B_KING', b_king, 4),
  W_KING: new King('W_KING', w_king, 60)
}