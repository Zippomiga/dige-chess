import b_knight_png from '../assets/chess-pieces/b-knight.png'
import w_knight_png from '../assets/chess-pieces/w-knight.png'
import { findColumn, validCoord } from './auxiliar-functions'


class Knight {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
  }

  getMoves(position, filledSquares = null) {
    return updateCoords(position).filter(validCoord)
  }
}


function updateCoords(position) {
  const newCoord = (axis, diff) => position + axis + diff
  const [x, y] = [2, 16]

  const X = {
    belowLeft: newCoord(-x, 8),
    aboveLeft: newCoord(-x, -8),
    aboveRight: newCoord(x, -8),
    belowRight: newCoord(x, 8)
  }

  const Y = {
    belowLeft: newCoord(y, -1),
    aboveLeft: newCoord(-y, -1),
    aboveRight: newCoord(-y, 1),
    belowRight: newCoord(y, 1),
  }

  const COLUMN = findColumn(position)

  switch (COLUMN) {
    case 0:  //knight at column A
      return [
        X.aboveRight, X.belowRight,
        Y.aboveRight, Y.belowRight
      ]
    case 1:  //knight at column B
      return [
        X.aboveRight, X.belowRight,
        Y.aboveLeft, Y.aboveRight, Y.belowRight, Y.belowLeft
      ]
    case 6:  //knight at column G
      return [
        X.aboveLeft, X.belowLeft,
        Y.aboveLeft, Y.aboveRight, Y.belowRight, Y.belowLeft
      ]
    case 7:  //knight at column H
      return [
        X.aboveLeft, X.belowLeft,
        Y.aboveLeft, Y.belowLeft
      ]
    default: //knight at column C || D || E || F
      return [
        ...Object.values(X),
        ...Object.values(Y)
      ]
  }
}


export const KNIGHTS = {
  B_KNIGHT_1: new Knight('B_KNIGHT_1', b_knight_png),
  B_KNIGHT_2: new Knight('B_KNIGHT_2', b_knight_png),
  W_KNIGHT_1: new Knight('W_KNIGHT_1', w_knight_png),
  W_KNIGHT_2: new Knight('W_KNIGHT_2', w_knight_png),
}