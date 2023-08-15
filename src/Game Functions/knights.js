import b_knight_png from '../assets/chess-pieces/b-knight.png'
import w_knight_png from '../assets/chess-pieces/w-knight.png'
import { column } from './auxiliar-functions'


class Knight {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
  }

  getMoves(position, filledSquares = null) {
    return updateCoords(position)
      .filter(coord => -1 < coord && coord < 64)
  }
}


function updateCoords(position) {
  const [x, y] = [2, 16]

  const X = {
    b_l: position - x + 8,
    a_l: position - x - 8,
    a_r: position + x - 8,
    b_r: position + x + 8
  }

  const Y = {
    b_l: position + y - 1,
    a_l: position - y - 1,
    a_r: position - y + 1,
    b_r: position + y + 1
  }

  switch (column(position)) {
    case 0:         //knight at column A
      return [
        X.a_r, X.b_r,
        Y.a_r, Y.b_r
      ]
    case 1:         //knight at column B
      return [
        X.a_r, X.b_r,
        Y.a_l, Y.a_r, Y.b_r, Y.b_l
      ]
    case 6:         //knight at column G
      return [
        X.a_l, X.b_l,
        Y.a_l, Y.a_r, Y.b_r, Y.b_l
      ]
    case 7:         //knight at column H
      return [
        X.a_l, X.b_l,
        Y.a_l, Y.b_l
      ]
    default:        //knight at column C || D || E || F
      return [
        X.a_l, X.a_r, X.b_r, X.b_l,
        Y.a_l, Y.a_r, Y.b_r, Y.b_l
      ]
  }
}


export const KNIGHTS = {
  B_KNIGHT_1: new Knight('B_KNIGHT_1', b_knight_png),
  B_KNIGHT_2: new Knight('B_KNIGHT_2', b_knight_png),
  W_KNIGHT_1: new Knight('W_KNIGHT_1', w_knight_png),
  W_KNIGHT_2: new Knight('W_KNIGHT_2', w_knight_png),
}