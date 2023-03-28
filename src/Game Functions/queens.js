import b_queen from '../assets/chess-pieces/b-queen.png'
import w_queen from '../assets/chess-pieces/w-queen.png'
import { idxEdges, coords, updateCoords } from './auxiliar-functions'


const INIT_COORDS = {
  b_queen: [
    2, 1, 0, 4, 5, 6, 7, 10, 17, 24, 11, 19, 27, 35, 43, 51, 59, 12, 21, 30, 39
  ],
  w_queen: [
    50, 41, 32, 51, 43, 35, 27, 19, 11, 3, 52, 45, 38, 31, 58, 57, 56, 60, 61, 62, 63
  ],
}


class Queen {
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
    const { corner, edge, innerQuadrant, idx } = coords

    const ranges = [

      // [[0], [7, 56, 63], [1, 8, 9]],
      // [[7], [0, 56, 63], [-1, 7, 8]],
      // [[56], [0, 7, 63], [-8, -7, 1]],
      // [[63], [0, 7, 56], [-9, -8, -1]],

      corner(0, [1, 8, 9]),
      corner(7, [-1, 7, 8]),
      corner(56, [-8, -7, 1]),
      corner(63, [-9, -8, -1]),

      edge(top, [-1, 1, 7, 8, 9]),
      edge(left, [-8, -7, 1, 8, 9]),
      edge(right, [-9, -8, -1, 7, 8]),
      edge(bottom, [-9, -8, -7, -1, 1]),

      innerQuadrant([-9, -8, -7, -1, 1, 7, 8, 9])
    ]

    const i = idx(ranges, pos)
    this.coords = updateCoords(pos, ranges[i])

    console.log(ranges[i], i)

    this.resetMoves()
    console.log(this.coords)
  }
}


export const QUEENS = {
  B_QUEEN: new Queen('B_QUEEN', b_queen, INIT_COORDS.b_queen),
  W_QUEEN: new Queen('W_QUEEN', w_queen, INIT_COORDS.w_queen)
}