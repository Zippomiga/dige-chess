import { ROOKS } from './rooks'
import { KNIGHTS } from './knights'
import { BISHOPS } from './bishops'
import { QUEENS } from './queens'
import { KINGS } from './kings'
import { PAWNS } from './pawns'


export const CHESS_BOARD = [
  ROOKS.B_ROOK_1,
  KNIGHTS.B_KNIGHT_1,
  BISHOPS.B_BISHOP_1,
  QUEENS.B_QUEEN,
  KINGS.B_KING,
  BISHOPS.B_BISHOP_2,
  KNIGHTS.B_KNIGHT_2,
  ROOKS.B_ROOK_2,
  PAWNS.B_PAWN_1,
  PAWNS.B_PAWN_2,
  PAWNS.B_PAWN_3,
  PAWNS.B_PAWN_4,
  PAWNS.B_PAWN_5,
  PAWNS.B_PAWN_6,
  PAWNS.B_PAWN_7,
  PAWNS.B_PAWN_8,
  ...Array(32).fill(null),
  PAWNS.W_PAWN_1,
  PAWNS.W_PAWN_2,
  PAWNS.W_PAWN_3,
  PAWNS.W_PAWN_4,
  PAWNS.W_PAWN_5,
  PAWNS.W_PAWN_6,
  PAWNS.W_PAWN_7,
  PAWNS.W_PAWN_8,
  ROOKS.W_ROOK_1,
  KNIGHTS.W_KNIGHT_1,
  BISHOPS.W_BISHOP_1,
  QUEENS.W_QUEEN,
  KINGS.W_KING,
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