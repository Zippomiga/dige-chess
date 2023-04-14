import b_knight_png from '../assets/chess-pieces/b-knight.png'
import w_knight_png from '../assets/chess-pieces/w-knight.png'
import { column, isIn } from './auxiliar-functions'


class Knight {
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

  setCoords(setMoves) {
    const { positions: [oldPos, newPos] } = this

    if (newPos) return // it runs only when player selects the piece

    this.coords = updateCoords(oldPos)

    setMoves(this.coords)
    console.log(this.coords)
  }
}


function updateCoords(pos) {
  const [x, y] = [2, 16]

  const X = {
    b_l: pos - x + 8,
    a_l: pos - x - 8,
    a_r: pos + x - 8,
    b_r: pos + x + 8
  }

  const Y = {
    b_l: pos + y - 1,
    a_l: pos - y - 1,
    a_r: pos - y + 1,
    b_r: pos + y + 1
  }

  const columns = [
    [0, 8, 16, 24, 32, 40, 48, 56],   //column A
    [1, 9, 17, 25, 33, 41, 49, 57],   //column B
    [6, 14, 22, 30, 38, 46, 54, 62],  //column G
    [7, 15, 23, 31, 39, 47, 55, 63]   //column H
  ]


  switch (column(columns, pos)) {
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
    case 2:         //knight at column G
      return [
        X.a_l, X.b_l,
        Y.a_l, Y.a_r, Y.b_r, Y.b_l
      ]
    case 3:         //knight at column H
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