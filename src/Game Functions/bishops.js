import b_bishop from '../assets/chess-pieces/b-bishop.png'
import w_bishop from '../assets/chess-pieces/w-bishop.png'
import { corner, edge, innerQuadrant, updateCoords, isIn, clickedTwice } from './auxiliar-functions'


class Bishop {
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
    return !isIn(this.coords, this.positions[1])
  }

  setCoords(setMoves, filledSquares) {
    const { positions: [oldPos, newPos] } = this

    if (clickedTwice(newPos)) return // it runs only when player selects the piece

    const ranges = [
      corner(0, [9]),
      corner(7, [7]),
      corner(56, [-7]),
      corner(63, [-9]),

      edge(0, [7, 9]),
      edge(1, [-7, 9]),
      edge(2, [-9, 7]),
      edge(3, [-9, -7]),

      innerQuadrant([-9, -7, 7, 9])
    ]

    this.coords = updateCoords(
      ranges,
      oldPos,
      filledSquares
    )

    setMoves(this.coords)
    console.log(this.coords)
  }
}


export const BISHOPS = {
  B_BISHOP_1: new Bishop('B_BISHOP_1', b_bishop),
  B_BISHOP_2: new Bishop('B_BISHOP_2', b_bishop),
  W_BISHOP_1: new Bishop('W_BISHOP_1', w_bishop),
  W_BISHOP_2: new Bishop('W_BISHOP_2', w_bishop)
}