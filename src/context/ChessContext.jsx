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
    if (chess.squares.length === 2) {
      setChess(chess => {
        const invalidMove = !chess.moves?.includes(POS_2)
        const samePlayer = PIECE_1?.name[0] === PIECE_2?.name[0]

        return invalidMove || samePlayer ?
          {
            ...chess,
            squares: [],
            positions: [],
            moves: [],
          } : {
            board: updateBoard(),
            squares: [],
            positions: [],
            moves: [],
            check: isCheck(),
            turn: !chess.turn
          }
      })
    } else {
      setChess(chess => {
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