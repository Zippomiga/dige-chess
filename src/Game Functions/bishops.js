import b_bishop from '../assets/chess-pieces/b-bishop.png'
import w_bishop from '../assets/chess-pieces/w-bishop.png'
import { idxEdges, coords, updateCoords } from './auxiliar-functions'


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
    const [top, left, right, bottom] = idxEdges
    const { edge, innerQuadrant, idx } = coords
    
    const ranges = [

      [[0], [63], [9]],
      [[7], [56], [7]],
      [[56], [7], [-7]],
      [[63], [0], [-9]],

      edge(top, [7, 9]),
      edge(left, [-7, 9]),
      edge(right, [-9, 7]),
      edge(bottom, [-9, -7]),

      innerQuadrant([-9, -7, 7, 9])
    ]

    const i = idx(ranges, pos)
    this.coords = updateCoords(pos, ranges[i])

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