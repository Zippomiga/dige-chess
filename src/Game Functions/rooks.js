import b_rook_png from '../assets/chess-pieces/b-rook.png'
import w_rook_png from '../assets/chess-pieces/w-rook.png'
import { isInCoords } from './auxiliar-functions'

const INIT_COORDS = {
  b_rook1: {
    X: [0, 1, 2, 3, 4, 5, 6, 7],
    Y: [0, 8, 16, 24, 32, 40, 48, 56]
  },
  b_rook2: {
    X: [7, 6, 5, 4, 3, 2, 1, 0],
    Y: [7, 15, 23, 31, 39, 47, 55, 63]
  },
  w_rook1: {
    X: [56, 57, 58, 59, 60, 61, 62, 63],
    Y: [56, 48, 40, 32, 24, 16, 8, 0]
  },
  w_rook2: {
    X: [63, 62, 61, 60, 59, 58, 57, 56],
    Y: [63, 55, 47, 39, 31, 23, 15, 7]
  }
}


class Rook {
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
    const [pos1, pos2] = this.moves

    const max = Math.max(...this.moves)
    const min = Math.min(...this.moves)
    const diff = max - min

    const { X, Y } = this.coords

    if (isInCoords(X, pos2)) {
      this.coords.Y = updateRookCoords(Y, pos1, pos2, diff)
    }

    if (isInCoords(Y, pos2)) {
      this.coords.X = updateRookCoords(X, pos1, pos2, diff)
    }

    this.resetMoves()
    console.log(this.coords)
  }
}


function updateRookCoords(coords, pos1, pos2, diff) {
  return coords.map(coord => {
    if (pos1 < pos2) { return coord + diff }
    if (pos1 > pos2) { return coord - diff }
  })
}


export const ROOKS = {
  B_ROOK_1: new Rook('B_ROOK_1', b_rook_png, INIT_COORDS.b_rook1),
  B_ROOK_2: new Rook('B_ROOK_2', b_rook_png, INIT_COORDS.b_rook2),
  W_ROOK_1: new Rook('W_ROOK_1', w_rook_png, INIT_COORDS.w_rook1),
  W_ROOK_2: new Rook('W_ROOK_2', w_rook_png, INIT_COORDS.w_rook2),
}