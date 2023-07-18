import b_queen from '../assets/chess-pieces/b-queen.png'
import w_queen from '../assets/chess-pieces/w-queen.png'
import { corner, edge, innerQuadrant, updateCoords } from './auxiliar-functions'


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

  illegalMove() {
    return !this.coords.includes(this.positions[1])
  }

  checkCheck(contraryKing, filledSquares) {
    const coordsToCheck = updateCoords(
      RANGES,
      this.positions[1],
      filledSquares,
    )

    if (coordsToCheck.includes(contraryKing)) {
      console.log('CHECK')
    } else {
      console.log('NOPE CHECK')
      this.resetPositions()
    }

    console.log(coordsToCheck)
  }

  setCoords(setMoves, filledSquares) {
    this.coords = updateCoords(
      RANGES,
      this.positions[0],
      filledSquares,
    )

    setMoves(this.coords)
  }
}


export const QUEENS = {
  B_QUEEN: new Queen('B_QUEEN', b_queen),
  W_QUEEN: new Queen('W_QUEEN', w_queen)
}