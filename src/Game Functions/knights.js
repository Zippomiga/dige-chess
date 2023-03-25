import b_knight_png from '../assets/chess-pieces/b-knight.png'
import w_knight_png from '../assets/chess-pieces/w-knight.png'
import { isInCoords } from './auxiliar-functions'

const INIT_COORDS = {
  b_knight1: { X: [11], Y: [16, 18] },
  b_knight2: { X: [12], Y: [21, 23] },
  w_knight1: { X: [51], Y: [40, 42] },
  w_knight2: { X: [52], Y: [45, 47] }
}


class Knight {
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
    const { X, Y } = this.coords

    if (isInCoords(X, pos) || isInCoords(Y, pos)) {
      this.coords = updateKinghtCoords(pos)
    }

    this.resetMoves()
    console.log(this.coords)
  }
}


const borders = [
  [0, 8, 16, 24, 32, 40, 48, 56],   //extreme   Left
  [1, 9, 17, 25, 33, 41, 49, 57],   //interior  Left
  [7, 15, 23, 31, 39, 47, 55, 63],  //extreme   Right
  [6, 14, 22, 30, 38, 46, 54, 62]   //inteior   Right
]

function updateKinghtCoords(pos) {
  const [x, y] = [2, 16]

  const x_b_l = pos - x + 8
  const x_a_l = pos - x - 8
  const x_a_r = pos + x - 8
  const x_b_r = pos + x + 8

  const y_b_l = pos + y - 1
  const y_a_l = pos - y - 1
  const y_a_r = pos - y + 1
  const y_b_r = pos + y + 1

  const range = borders.findIndex(border => isInCoords(border, pos))

  switch (range) {
    case 0:   //kinght is on the far left
      return {
        X: [x_a_r, x_b_r],
        Y: [y_a_r, y_b_r]
      }
    case 1:
      return {
        X: [x_a_r, x_b_r],
        Y: [y_a_l, y_a_r, y_b_r, y_b_l]
      }
    case 2:   //kinght is on the far right
      return {
        X: [x_a_l, x_b_l],
        Y: [y_a_l, y_b_l]
      }
    case 3:
      return {
        X: [x_a_l, x_b_l],
        Y: [y_a_l, y_a_r, y_b_r, y_b_l]
      }
    default:  //kinght is on the inner quadrant
      return {
        X: [x_a_l, x_a_r, x_b_r, x_b_l],
        Y: [y_a_l, y_a_r, y_b_r, y_b_l]
      }
  }
}


export const KNIGHTS = {
  B_KNIGHT_1: new Knight('B_KNIGHT_1', b_knight_png, INIT_COORDS.b_knight1),
  B_KNIGHT_2: new Knight('B_KNIGHT_2', b_knight_png, INIT_COORDS.b_knight2),
  W_KNIGHT_1: new Knight('W_KNIGHT_1', w_knight_png, INIT_COORDS.w_knight1,),
  W_KNIGHT_2: new Knight('W_KNIGHT_2', w_knight_png, INIT_COORDS.w_knight2),
}