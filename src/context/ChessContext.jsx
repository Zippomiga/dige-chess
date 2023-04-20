import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useRef, useState } from "react";

export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [chessBoard, setChessBoard] = useState(CHESS_BOARD)
  const [turn, setTurn] = useState(true)
  const pieces = useRef([])
  const playerTurn = turn ? 'W' : 'B'
  const [moves, setMoves] = useState([])
  const [check, setCheck] = useState(false)
  console.log(moves.sort())

  return (
    <ChessContext.Provider value={{
      chessBoard,
      setChessBoard,
      turn,
      setTurn,
      pieces,
      playerTurn,
      moves,
      setMoves,
      check,
      setCheck
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}