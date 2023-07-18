import b_bishop from '../assets/chess-pieces/b-bishop.png'
import w_bishop from '../assets/chess-pieces/w-bishop.png'
import { corner, edge, innerQuadrant, updateCoords } from './auxiliar-functions'


const RANGES = [
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
      filledSquares
    )

    setMoves(this.coords)
  }
}


export const BISHOPS = {
  B_BISHOP_1: new Bishop('B_BISHOP_1', b_bishop),
  B_BISHOP_2: new Bishop('B_BISHOP_2', b_bishop),
  W_BISHOP_1: new Bishop('W_BISHOP_1', w_bishop),
  W_BISHOP_2: new Bishop('W_BISHOP_2', w_bishop)
}