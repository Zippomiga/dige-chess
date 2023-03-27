import b_pawn from '../assets/chess-pieces/b-pawn.png'
// import b_rook from '../assets/chess-pieces/b-rook.png'
// import b_knight from '../assets/chess-pieces/b-knight.png'
// import b_bishop from '../assets/chess-pieces/b-bishop.png'
import b_queen from '../assets/chess-pieces/b-queen.png'
import b_king from '../assets/chess-pieces/b-king.png'

import w_pawn from '../assets/chess-pieces/w-pawn.png'
// import w_rook from '../assets/chess-pieces/w-rook.png'
// import w_knight from '../assets/chess-pieces/w-knight.png'
// import w_bishop from '../assets/chess-pieces/w-bishop.png'
import w_queen from '../assets/chess-pieces/w-queen.png'
import w_king from '../assets/chess-pieces/w-king.png'


import { ROOKS } from './rooks'
import { KNIGHTS } from './knights'
import { BISHOPS } from './bishops'
import { QUEENS } from './queens'


class Piece {
  constructor(name, pic, initCoords = null) {
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

  setNewCoords() {
    console.log(this.moves)
  }
}


export const PIECES = {
  B_PAWN_1: new Piece('B_PAWN_1', b_pawn),
  B_PAWN_2: new Piece('B_PAWN_2', b_pawn),
  B_PAWN_3: new Piece('B_PAWN_3', b_pawn),
  B_PAWN_4: new Piece('B_PAWN_4', b_pawn),
  B_PAWN_5: new Piece('B_PAWN_5', b_pawn),
  B_PAWN_6: new Piece('B_PAWN_6', b_pawn),
  B_PAWN_7: new Piece('B_PAWN_7', b_pawn),
  B_PAWN_8: new Piece('B_PAWN_8', b_pawn),

  // B_ROOK_1: new Piece('B_ROOK_1', b_rook, init_b_rook1_coords),
  // B_ROOK_2: new Piece('B_ROOK_2', b_rook, init_b_rook2_coords),

  // B_KNIGHT_1: new Piece('B_KNIGHT_1', b_knight),
  // B_KNIGHT_2: new Piece('B_KNIGHT_2', b_knight),

  // B_BISHOP_1: new Piece('B_BISHOP_1', b_bishop),
  // B_BISHOP_2: new Piece('B_BISHOP_2', b_bishop),

  B_QUEEN: new Piece('B_QUEEN', b_queen),
  B_KING: new Piece('B_KING', b_king),

  W_PAWN_1: new Piece('W_PAWN_1', w_pawn),
  W_PAWN_2: new Piece('W_PAWN_2', w_pawn),
  W_PAWN_3: new Piece('W_PAWN_3', w_pawn),
  W_PAWN_4: new Piece('W_PAWN_4', w_pawn),
  W_PAWN_5: new Piece('W_PAWN_5', w_pawn),
  W_PAWN_6: new Piece('W_PAWN_6', w_pawn),
  W_PAWN_7: new Piece('W_PAWN_7', w_pawn),
  W_PAWN_8: new Piece('W_PAWN_8', w_pawn),

  // W_ROOK_1: new Piece('W_ROOK_1', w_rook, init_w_rook1_coords),
  // W_ROOK_2: new Piece('W_ROOK_2', w_rook, init_w_rook2_coords),

  // W_KNIGHT_1: new Piece('W_KNIGHT_1', w_knight),
  // W_KNIGHT_2: new Piece('W_KNIGHT_2', w_knight),

  // W_BISHOP_1: new Piece('W_BISHOP_1', w_bishop),
  // W_BISHOP_2: new Piece('W_BISHOP_2', w_bishop),

  W_QUEEN: new Piece('W_QUEEN', w_queen),
  W_KING: new Piece('W_KING', w_king),
}


export const CHESS_BOARD = [
  ROOKS.B_ROOK_1,
  KNIGHTS.B_KNIGHT_1,
  BISHOPS.B_BISHOP_1,
  QUEENS.B_QUEEN,
  PIECES.B_KING,
  BISHOPS.B_BISHOP_2,
  KNIGHTS.B_KNIGHT_2,
  ROOKS.B_ROOK_2,
  PIECES.B_PAWN_1,
  PIECES.B_PAWN_2,
  PIECES.B_PAWN_3,
  PIECES.B_PAWN_4,
  PIECES.B_PAWN_5,
  PIECES.B_PAWN_6,
  PIECES.B_PAWN_7,
  PIECES.B_PAWN_8,
  ...Array(32).fill(null),
  PIECES.W_PAWN_1,
  PIECES.W_PAWN_2,
  PIECES.W_PAWN_3,
  PIECES.W_PAWN_4,
  PIECES.W_PAWN_5,
  PIECES.W_PAWN_6,
  PIECES.W_PAWN_7,
  PIECES.W_PAWN_8,
  ROOKS.W_ROOK_1,
  KNIGHTS.W_KNIGHT_1,
  BISHOPS.W_BISHOP_1,
  QUEENS.W_QUEEN,
  PIECES.W_KING,
  BISHOPS.W_BISHOP_2,
  KNIGHTS.W_KNIGHT_2,
  ROOKS.W_ROOK_2
]

// export const CHESS_BOARD = [
//   null,
//   KNIGHTS.B_KNIGHT_1,
//   null,
//   null,
//   null,
//   null,
//   KNIGHTS.B_KNIGHT_2,
//   null,
//   ...Array(48).fill(null),
//   null,
//   KNIGHTS.W_KNIGHT_1,
//   null,
//   null,
//   null,
//   null,
//   KNIGHTS.W_KNIGHT_2,
//   null,
// ]