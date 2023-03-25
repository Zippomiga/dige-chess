import { CHESS_BOARD } from "../Game Functions/game-functions";
import { createContext, useRef, useState } from "react";

export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [chessBoard, setChessBoard] = useState(CHESS_BOARD)
  const [turn, setTurn] = useState(true)
  const pieces = useRef([])

  return (
    <ChessContext.Provider value={{
      chessBoard,
      setChessBoard,
      turn,
      setTurn,
      pieces
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}