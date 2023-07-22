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
    turn: true
  })

  const FILLED_SQUARES = chess.board.map((piece, pos) => piece && pos)
  const [PIECE_1, PIECE_2] = chess.squares
  const [POS_1, POS_2] = chess.positions
  const PLAYER = chess.turn ? 'W' : 'B'

  // const invalidSquare = PIECE_1 === null
  // const invalidMove = !moves?.includes(POS_2)

  // const invalidPlayer = !PIECE_1?.name.startsWith(PLAYER)
  // const samePlayer = PIECE_1?.name.startsWith(PIECE_2?.name[0])

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

    const movesToCheck = PIECE_1?.getMoves(POS_2, FILLED_SQUARES)

    return movesToCheck?.includes(CONTRARY_KING)
  }

  useEffect(() => {
    const MOVES = PIECE_1?.getMoves(POS_1, FILLED_SQUARES).filter(move => {
      const piece = chess.board[move]
      return !piece?.name.startsWith(PLAYER)
    })

    setChess(chess => ({ ...chess, moves: MOVES }))

    if (chess.squares.length === 2) { // this means that the player has clicked twice
      setChess(chess => {
        return {
          board: updateBoard(),
          squares: [],
          positions: [],
          moves: [],
          check: isCheck(),
          turn: !chess.turn
        }
      })
    }
  }, [chess.squares])

  return (
    <ChessContext.Provider value={{
      chess,
      setChess
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}