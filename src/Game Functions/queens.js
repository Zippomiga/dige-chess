import b_queen from '../assets/chess-pieces/b-queen.png'
import w_queen from '../assets/chess-pieces/w-queen.png'
import { isInCoords } from './auxiliar-functions'

const INIT_COORDS = {
  b_queen: null,
  w_queen: null,
}


const edges = [
  [0, 1, 2, 3, 4, 5, 6, 7],         //Top
  [0, 8, 16, 24, 32, 40, 48, 56],          //Left
  [7, 15, 23, 31, 39, 47, 55, 63],         //Right
  [56, 57, 58, 59, 60, 61, 62, 63], //Bottom
]



class Queen {
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

    const borders = [

      [[0], [7, 56, 63], [1, 8, 9]],
      [[7], [0, 56, 63], [-1, 7, 8]],
      [[56], [0, 7, 63], [-8, -7, 1]],
      [[63], [0, 7, 56], [-9, -8, -1]],
      
      [edges[0], f_b(0), [-1, 1, 7, 8, 9]],
      [edges[1], f_b(1), [-8, -7, 1, 8, 9]],
      [edges[2], f_b(2), [-9, -8, -1, 7, 8 ]],
      [edges[3], f_b(3), [-9, -8, -7, -1, 1]],
      
    ]

    const e = borders.findIndex(b => b[0].includes(pos))
    
    console.log(borders[e])
    // if (isInCoords(this.coords, pos)) {
    this.coords = updateQueenCoords(pos, borders[e])
    // }

    this.resetMoves()
    console.log(this.coords)
  }
}





const f_b = (pos) => edges.filter(b => !b.includes(pos)).flat()


function updateQueenCoords(pos, refs) {
  const coords = []

  refs[2].forEach(ref => {
    let coord = pos

    while (!refs[1].includes(coord)) {
      coord += ref
      coords.push(coord)
    }
  })

  return coords
}





// const borders = [
//   [0, 1, 2, 3, 4, 5, 6, 7],         //Top
//   [0, 8, 16, 24, 32, 40, 48, 56],          //Left
//   [7, 15, 23, 31, 39, 47, 55, 63],         //Right
//   [56, 57, 58, 59, 60, 61, 62, 63], //Bottom
// ]


// function updateQueenCoords(pos) {
//   const brd = borders.findIndex(b => isInCoords(b, pos))

//   const ranges = {
//     0: setRange([-1, 1, 8], 0),
//     1: setRange([-7, 9], 1),
//     2: setRange([-9, 7], 2),
//     3: setRange([-7, -9], 3)
//   }

//   console.log(ranges)

//   return ranges[brd] || setRange([-9, -8, -7, -1, 1, 7, 8, 9], borders)

//   //------------------------------------------------------------//

//   function setRange(refs, brd) {
//     const coords = []
//     const f_brd = borders.filter((_, i) => i !== brd).flat()

//     refs.forEach(ref => {
//       let coord = pos

//       while (!isInCoords(f_brd, coord)) {
//         coord += ref
//         coords.push(coord)
//       }
//     })

//     switch (pos) {
//       case 0:
//       case 63:
//         return coords.slice(8)
//       case 7:
//       case 56:
//         return coords.slice(0, 7)
//       default:
//         return coords
//     }
//   }
// }



export const QUEENS = {
  B_QUEEN: new Queen('B_QUEEN', b_queen),
  W_QUEEN: new Queen('W_QUEEN', w_queen)
}