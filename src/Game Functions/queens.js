import b_queen from '../assets/chess-pieces/b-queen.png'
import w_queen from '../assets/chess-pieces/w-queen.png'
import { coords, isIn } from './auxiliar-functions'


const { corner, edge, innerQuadrant, idx, updateCoords } = coords
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


class Queen {
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

  isInCoords() {
    return isIn(this.coords, this.positions[1])
  }

  setCoords(filledSquares) {
    if (this.positions[1]) return // this makes the function runs once, only when player clicks for first time

    const range = idx(ranges, this.positions[0])

    this.coords = updateCoords(...range, filledSquares)
    console.log(this.coords)
  }
}


export const QUEENS = {
  B_QUEEN: new Queen('B_QUEEN', b_queen),
  W_QUEEN: new Queen('W_QUEEN', w_queen)
}