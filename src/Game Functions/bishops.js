import b_bishop from '../assets/chess-pieces/b-bishop.png'
import w_bishop from '../assets/chess-pieces/w-bishop.png'
import { isInCoords } from './auxiliar-functions'

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

    if (isInCoords(this.coords, pos)) {
      this.coords = updateBishopCoords(pos)
    }

    this.resetMoves()
    console.log(this.coords)
  }
}


const borders = [
  [0, 1, 2, 3, 4, 5, 6, 7],         //Top
  [8, 16, 24, 32, 40, 48],          //Left
  [15, 23, 31, 39, 47, 55],         //Right
  [56, 57, 58, 59, 60, 61, 62, 63], //Bottom
]


function updateBishopCoords(pos) {
  const brd = borders.findIndex(b => isInCoords(b, pos))

  const ranges = [
    setRange([7, 9], 0),
    setRange([-7, 9], 1),
    setRange([-9, 7], 2),
    setRange([-7, -9], 3)
  ]

  return ranges[brd] || setRange([-9, -7, 7, 9], borders)

  //------------------------------------------------------------//

  function setRange(refs, brd) {
    const coords = []
    const f_br = borders.filter((_, i) => i !== brd).flat()

    refs.forEach(ref => {
      let coord = pos

      while (!isInCoords(f_br, coord)) {
        coord += ref
        coords.push(coord)
      }
    })

    switch (pos) {
      case 0:
      case 63:
        return coords.slice(8)
      case 7:
      case 56:
        return coords.slice(0, 7)
      default:
        return coords
    }
  }
}


export const BISHOPS = {
  B_BISHOP_1: new Bishop('B_BISHOP_1', b_bishop, INIT_COORDS.b_bishop1),
  B_BISHOP_2: new Bishop('B_BISHOP_2', b_bishop, INIT_COORDS.b_bishop2),
  W_BISHOP_1: new Bishop('W_BISHOP_1', w_bishop, INIT_COORDS.w_bishop1),
  W_BISHOP_2: new Bishop('W_BISHOP_2', w_bishop, INIT_COORDS.w_bishop2)
}