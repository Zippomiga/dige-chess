import b_knight_png from '../assets/chess-pieces/b-knight.png'
import w_knight_png from '../assets/chess-pieces/w-knight.png'
import { COLUMNS } from './auxiliar-functions'


class Knight {
  constructor(name, pic) {
    this.name = name
    this.pic = pic
  }

  getMoves(currentCoord, board) {
    return updateCoords(currentCoord, board)
  }
}


function updateCoords(currentCoord, board) {
  const LEFT = {
    BOTTOM: 15,
    BELOW: 6,
    ABOVE: -10,
    TOP: -17
  }

  const RIGHT = {
    TOP: -15,
    ABOVE: -6,
    BELOW: 10,
    BOTTOM: 17
  }

  const newCoords = directions => {
    return directions.map(direction => {
      const newCoord = currentCoord + direction
      return board.findIndex((_, boardCoord) => newCoord === boardCoord)
    })
  }

  const COLUMN = COLUMNS
    .findIndex(column => column.includes(currentCoord))


  switch (COLUMN) {
    case 0:
      const COLUMN_A = [RIGHT.TOP, RIGHT.ABOVE, RIGHT.BELOW, RIGHT.BOTTOM]
      return newCoords(COLUMN_A)
    case 1:
      const COLUMN_B = [LEFT.TOP, RIGHT.TOP, RIGHT.ABOVE, RIGHT.BELOW, RIGHT.BOTTOM, LEFT.BOTTOM]
      return newCoords(COLUMN_B)
    case 6:
      const COLUMN_G = [RIGHT.TOP, LEFT.TOP, LEFT.ABOVE, LEFT.BELOW, LEFT.BOTTOM, RIGHT.BOTTOM]
      return newCoords(COLUMN_G)
    case 7:
      const COLUMN_H = [LEFT.BOTTOM, LEFT.BELOW, LEFT.ABOVE, LEFT.TOP]
      return newCoords(COLUMN_H)
    default:
      const REST_OF_COLUMNS = [...Object.values(LEFT), ...Object.values(RIGHT)]
      return newCoords(REST_OF_COLUMNS)
  }
}


export const KNIGHTS = {
  B_KNIGHT_1: new Knight('B_KNIGHT_1', b_knight_png),
  B_KNIGHT_2: new Knight('B_KNIGHT_2', b_knight_png),
  W_KNIGHT_1: new Knight('W_KNIGHT_1', w_knight_png),
  W_KNIGHT_2: new Knight('W_KNIGHT_2', w_knight_png),
}