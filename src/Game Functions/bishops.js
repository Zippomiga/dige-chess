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

    // if (isInCoords(this.coords, pos)) {
    this.coords = up(pos)
    // }

    this.resetMoves()
    console.log(this.coords)
  }
}


const borders = [
  [0, 1, 2, 3, 4, 5, 6, 7],                   //Top
  [8, 16, 24, 32, 40, 48],       //Left
  [15, 23, 31, 39, 47, 55],      //Right
  [56, 57, 58, 59, 60, 61, 62, 63], //Bottom
]

function up(pos) {
  const range = borders.findIndex(border => isInCoords(border, pos))

  switch (range) {
    case 0:
      const rangeee = calcRange([7, 9], pos, 0)
      // const lala = pos === 0 ? range
      return pos === 0 ? rangeee.slice(8) : pos === 7 ? rangeee.slice(0, 7) : rangeee
    case 1:
      return calcRange([-7, 9], pos, 1)
    case 2:
      return calcRange([-9, 7], pos, 2)
    case 3:
      return calcRange([-7, -9], pos, 3)

    default:
      return calcRange([-9, -7, 7, 9], pos, borders)
  }
}


function calcRange(refs, pos, range) {
  const filteredBorders = borders.filter((_, i) => i !== range).flat()
  const ranges = []

  refs.forEach(ref => {
    let copy = pos

    while (!isInCoords(filteredBorders, copy)) {
      copy += ref
      ranges.push(copy)
    }
  })

  return ranges
}


export const BISHOPS = {
  B_BISHOP_1: new Bishop('B_BISHOP_1', b_bishop, INIT_COORDS.b_bishop1),
  B_BISHOP_2: new Bishop('B_BISHOP_2', b_bishop, INIT_COORDS.b_bishop2),
  W_BISHOP_1: new Bishop('W_BISHOP_1', w_bishop, INIT_COORDS.w_bishop1),
  W_BISHOP_2: new Bishop('W_BISHOP_2', w_bishop, INIT_COORDS.w_bishop2)
}