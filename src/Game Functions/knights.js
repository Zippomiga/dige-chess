import b_knight_png from '../assets/chess-pieces/b-knight.png'
import w_knight_png from '../assets/chess-pieces/w-knight.png'
import { COLUMNS } from './auxiliar-functions'


class Knight {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
  }

  getMoves(currentCoord, board) {
    return updateCoords(currentCoord)
  }
}


function updateCoords(currentCoord) {
  const newCoord = (axis, diff) => currentCoord + axis + diff

  const [left_X, above_X, right_X, below_X] = [-2, -8, 2, 8]
  const [left_Y, above_Y, right_Y, below_Y] = [-1, -16, 1, 16]

  const X = {
    BL: newCoord(below_X, left_X),
    AL: newCoord(above_X, left_X),
    AR: newCoord(above_X, right_X),
    BR: newCoord(below_X, right_X)
  }

  const Y = {
    BL: newCoord(below_Y, left_Y),
    AL: newCoord(above_Y, left_Y),
    AR: newCoord(above_Y, right_Y),
    BR: newCoord(below_Y, right_Y),
  }

  
  const COLUMN = currentCoord => {
    return COLUMNS.findIndex(column => {
      return column.includes(currentCoord)
    })
  }


  switch (COLUMN) {
    case 0:  //knight at column A
      return [
        X.AR, X.BR,
        Y.AR, Y.BR
      ]
    case 1:  //knight at column B
      return [
        X.AR, X.BR,
        Y.BL, Y.AL, Y.AR, Y.BR
      ]
    case 6:  //knight at column G
      return [
        X.BL, X.AL,
        Y.BL, Y.AL, Y.AR, Y.BR
      ]
    case 7:  //knight at column H
      return [
        X.BL, X.AL,
        Y.BL, Y.AL
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