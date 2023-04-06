import b_bishop from '../assets/chess-pieces/b-bishop.png'
import w_bishop from '../assets/chess-pieces/w-bishop.png'
import { coords } from './auxiliar-functions'


const INIT_COORDS = {
  b_bishop1: [9, 16, 11, 20, 29, 38, 47],
  b_bishop2: [12, 19, 26, 33, 40, 14, 23],
  w_bishop1: [51, 44, 37, 30, 23, 49, 40],
  w_bishop2: [54, 47, 52, 43, 34, 25, 16]
}


class Bishop {
  constructor(name, pic, initCoords) {
    this.name = name
    this.pic = pic
    this.coords = initCoords
    this.moves = []
  }

  setMoves(pos) {
    this.moves.push(pos)
  }

  getMoves() {
    return this.moves
  }

  resetMoves() {
    this.moves = []
  }

  setNewCoords() {
    const pos = this.moves[1]
    const { corner, edge, innerQuadrant, idx, updateCoords } = coords
    
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

    const range = idx(ranges, pos)
    this.coords = updateCoords(...range)

    this.resetMoves()
    console.log(this.coords)
  }
}


export const BISHOPS = {
  B_BISHOP_1: new Bishop('B_BISHOP_1', b_bishop, INIT_COORDS.b_bishop1),
  B_BISHOP_2: new Bishop('B_BISHOP_2', b_bishop, INIT_COORDS.b_bishop2),
  W_BISHOP_1: new Bishop('W_BISHOP_1', w_bishop, INIT_COORDS.w_bishop1),
  W_BISHOP_2: new Bishop('W_BISHOP_2', w_bishop, INIT_COORDS.w_bishop2)
}