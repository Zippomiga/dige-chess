import b_queen from '../assets/chess-pieces/b-queen.png'
import w_queen from '../assets/chess-pieces/w-queen.png'
import { corner, edge, innerQuadrant, updateCoords, isIn } from './auxiliar-functions'


class Queen {
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

  setCoords(filledSquares) {
    if (this.positions[1]) return // it runs only when player selects the piece

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

    this.coords = updateCoords(ranges, this.positions[0], filledSquares)
    console.log(this.coords)
  }
}


export const QUEENS = {
  B_QUEEN: new Queen('B_QUEEN', b_queen),
  W_QUEEN: new Queen('W_QUEEN', w_queen)
}



  // //topleft
  // [7, 56, 63]
  // [1, 8, 9]

  // //topright
  // [0, 56, 63]
  // [-1, 7, 8]

  // //bottomleft
  // [0, 7, 63]
  // [-8, -7, 1]

  // //bottomright
  // [0, 7, 56]
  // [-9, -8, -1]
  
  // //top
  // [0, 8, 16, 24, 32, 40, 48, 56, 7, 15, 23, 31, 39, 47, 55, 63, 56, 57, 58, 59, 60, 61, 62, 63]
  // [-1, 1, 7, 8, 9]
  
  // //left
  // [0, 1, 2, 3, 4, 5, 6, 7, 7, 15, 23, 31, 39, 47, 55, 63, 56, 57, 58, 59, 60, 61, 62, 63]
  // [-8, -7, 1, 8, 9]

  // //right
  // [0, 1, 2, 3, 4, 5, 6, 7, 0, 8, 16, 24, 32, 40, 48, 56, 56, 57, 58, 59, 60, 61, 62, 63]
  // [-9, -8, -1, 7, 8]

  // //bottom
  // [0, 1, 2, 3, 4, 5, 6, 7, 0, 8, 16, 24, 32, 40, 48, 56, 7, 15, 23, 31, 39, 47, 55, 63]
  // [-9, -8, -7, -1, 1]
  
  // //innerQ
  // [9, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29, 30, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 49, 50, 51, 52, 53, 54]
  // [0, 1, 2, 3, 4, 5, 6, 7, 0, 8, 16, 24, 32, 40, 48, 56, 7, 15, 23, 31, 39, 47, 55, 63, 56, 57, 58, 59, 60, 61, 62, 63]
  // [-9, -8, -7, -1, 1, 7, 8, 9]