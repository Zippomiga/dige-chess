import b_king from '../assets/chess-pieces/b-king.png'
import w_king from '../assets/chess-pieces/w-king.png'

import { coords } from './auxiliar-functions'



const INIT_COORDS = {
  b_queen: [],
  w_queen: [],
}


class King {
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
    const { corner, edge, innerQuadrant, idx } = coords

    const ranges = [
      corner(0, [1, 8, 9]),         //TopLeft
      corner(7, [-1, 7, 8]),        //TopRight
      corner(56, [-8, -7, 1]),      //BottomLeft
      corner(63, [-9, -8, -1]),     //BottomRight

      edge(0, [-1, 1, 7, 8, 9]),    //Top
      edge(1, [-8, -7, 1, 8, 9]),   //Left
      edge(2, [-9, -8, -1, 7, 8]),  //Right
      edge(3, [-9, -8, -7, -1, 1]), //Bottom

      innerQuadrant([-9, -8, -7, -1, 1, 7, 8, 9])
    ]

    const range = idx(ranges, pos)
    this.coords = updateCoords(...range)

    this.resetMoves()
    console.log(this.coords)
  }
}

export function updateCoords(refs, pos) {
  const [, , moves] = refs

  return moves.map(move => move + pos)
}


export const KINGS = {
  B_KING: new King('B_KING', b_king, INIT_COORDS.b_king),
  W_KING: new King('W_KING', w_king, INIT_COORDS.w_king)
}