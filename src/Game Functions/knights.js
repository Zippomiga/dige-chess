import b_knight_png from '../assets/chess-pieces/b-knight.png'
import w_knight_png from '../assets/chess-pieces/w-knight.png'


const INIT_COORDS = {
  b_knight1: [11, 16, 18],
  b_knight2: [12, 21, 23],
  w_knight1: [51, 40, 42],
  w_knight2: [52, 45, 47]
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

    const columns = [
      [0, 8, 16, 24, 32, 40, 48, 56],   //column A
      [1, 9, 17, 25, 33, 41, 49, 57],   //column B
      [7, 15, 23, 31, 39, 47, 55, 63],  //column H
      [6, 14, 22, 30, 38, 46, 54, 62]   //column G
    ]

    const range = columns.findIndex(co => co.includes(pos))
    this.coords = updateCoords(pos, range)

    this.resetMoves()
    console.log(this.coords.sort((a, b) => a - b))
  }
}


function updateCoords(pos, range) {
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


  switch (range) {
    case 0:         //kinght at column A
      return [
        X.a_r, X.b_r,
        Y.a_r, Y.b_r
      ]
    case 1:         //kinght at column B
      return [
        X.a_r, X.b_r,
        Y.a_l, Y.a_r, Y.b_r, Y.b_l
      ]
    case 2:         //kinght iat column H
      return [
        X.a_l, X.b_l,
        Y.a_l, Y.b_l
      ]
    case 3:         //kinght at column G
      return [
        X.a_l, X.b_l,
        Y.a_l, Y.a_r, Y.b_r, Y.b_l
      ]
    default:        //kinght at inner Quadrant
      return [
        X.a_l, X.a_r, X.b_r, X.b_l,
        Y.a_l, Y.a_r, Y.b_r, Y.b_l
      ]
  }
}


export const KNIGHTS = {
  B_KNIGHT_1: new Knight('B_KNIGHT_1', b_knight_png, INIT_COORDS.b_knight1),
  B_KNIGHT_2: new Knight('B_KNIGHT_2', b_knight_png, INIT_COORDS.b_knight2),
  W_KNIGHT_1: new Knight('W_KNIGHT_1', w_knight_png, INIT_COORDS.w_knight1,),
  W_KNIGHT_2: new Knight('W_KNIGHT_2', w_knight_png, INIT_COORDS.w_knight2),
}