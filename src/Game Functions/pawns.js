import b_pawn from '../assets/chess-pieces/b-pawn.png'
import w_pawn from '../assets/chess-pieces/w-pawn.png'


const INIT_COORDS = {
  b_pawn_1: [16, 24],
  b_pawn_2: [17, 25],
  b_pawn_3: [18, 26],
  b_pawn_4: [19, 27],
  b_pawn_5: [20, 28],
  b_pawn_6: [21, 29],
  b_pawn_7: [22, 30],
  b_pawn_8: [23, 31],
  w_pawn_1: [40, 32],
  w_pawn_2: [41, 33],
  w_pawn_3: [42, 34],
  w_pawn_4: [43, 35],
  w_pawn_5: [44, 36],
  w_pawn_6: [45, 37],
  w_pawn_7: [46, 38],
  w_pawn_8: [47, 39]
}


class Pawn {
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

    this.coords = updateCoords(this.name, pos)

    this.resetMoves()
    console.log(this.coords)
  }
}

function updateCoords(name, pos) {
  const black = name.includes('B')

  return black ? pos + 8 : pos - 8
}


export const PAWNS = {
  B_PAWN_1: new Pawn('B_PAWN_1', b_pawn, INIT_COORDS.b_pawn_1),
  B_PAWN_2: new Pawn('B_PAWN_2', b_pawn, INIT_COORDS.b_pawn_2),
  B_PAWN_3: new Pawn('B_PAWN_3', b_pawn, INIT_COORDS.b_pawn_3),
  B_PAWN_4: new Pawn('B_PAWN_4', b_pawn, INIT_COORDS.b_pawn_4),
  B_PAWN_5: new Pawn('B_PAWN_5', b_pawn, INIT_COORDS.b_pawn_5),
  B_PAWN_6: new Pawn('B_PAWN_6', b_pawn, INIT_COORDS.b_pawn_6),
  B_PAWN_7: new Pawn('B_PAWN_7', b_pawn, INIT_COORDS.b_pawn_7),
  B_PAWN_8: new Pawn('B_PAWN_8', b_pawn, INIT_COORDS.b_pawn_8),

  W_PAWN_1: new Pawn('W_PAWN_1', w_pawn, INIT_COORDS.w_pawn_1),
  W_PAWN_2: new Pawn('W_PAWN_2', w_pawn, INIT_COORDS.w_pawn_2),
  W_PAWN_3: new Pawn('W_PAWN_3', w_pawn, INIT_COORDS.w_pawn_3),
  W_PAWN_4: new Pawn('W_PAWN_4', w_pawn, INIT_COORDS.w_pawn_4),
  W_PAWN_5: new Pawn('W_PAWN_5', w_pawn, INIT_COORDS.w_pawn_5),
  W_PAWN_6: new Pawn('W_PAWN_6', w_pawn, INIT_COORDS.w_pawn_6),
  W_PAWN_7: new Pawn('W_PAWN_7', w_pawn, INIT_COORDS.w_pawn_7),
  W_PAWN_8: new Pawn('W_PAWN_8', w_pawn, INIT_COORDS.w_pawn_8)
}