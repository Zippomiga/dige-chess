import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [chess, setChess] = useState({
    board: CHESS_BOARD,
    squares: [],
    positions: [],
    moves: [],
    check: false,
    king: null,
    turn: true
  })

  const {
    squares: [PIECE_1, PIECE_2],
    positions: [POS_1, POS_2]
  } = chess

  const FILLED_SQUARES = chess.board.map((piece, pos) => piece && pos)
  const PLAYER = chess.turn ? 'W' : 'B'

  const updateBoard = () => {
    const NEW_BOARD = [...chess.board]

    NEW_BOARD[POS_1] = null
    NEW_BOARD[POS_2] = PIECE_1

    return NEW_BOARD
  }

  const isCheck = () => {
    const CONTRARY_KING = chess.board.findIndex(king => {
      const contrary = {
        'W': 'B_KING',
        'B': 'W_KING'
      }
      return king?.name === contrary[PLAYER]
    })

    const IS_CHECK = PIECE_1?.getMoves(POS_2, FILLED_SQUARES).includes(CONTRARY_KING)

    return { CONTRARY_KING, IS_CHECK }
  }

  // const stillInCheck = () => {
  //   if (check) {
  //     return lastPiece?.getMoves(lastMove, FILLED_SQUARES).includes(chess.king)
  //   }
  // }

  useEffect(() => {
    if (chess.squares.length === 2) { // this means that the player has clicked twice
      setChess(chess => {
        const { CONTRARY_KING, IS_CHECK } = isCheck()
        const invalidMove = !chess.moves?.includes(POS_2)
        const samePlayer = PIECE_1?.name[0] === PIECE_2?.name[0]

        return invalidMove || samePlayer ? {
          ...chess,
          squares: [],
          positions: [],
          moves: [],
        } : {
          board: updateBoard(),
          squares: [],
          positions: [],
          moves: [],
          check: IS_CHECK,
          king: CONTRARY_KING,
          turn: !chess.turn
        }
      })
    } else {
      setChess(chess => { // this colorize the allowed moves
        const MOVES = PIECE_1?.getMoves(POS_1, FILLED_SQUARES).filter(move => {
          const piece = chess.board[move]
          return !piece?.name.startsWith(PLAYER)
        })

        return { ...chess, moves: MOVES }
      })
    }
  }, [chess.squares])


  return (
    <ChessContext.Provider value={{
      chess,
      setChess,
      PLAYER
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}