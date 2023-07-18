import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useRef, useState, useEffect } from "react";

export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [chessBoard, setChessBoard] = useState(CHESS_BOARD)
  const [turn, setTurn] = useState(true)
  const [moves, setMoves] = useState([])
  const [check, setCheck] = useState(false)
  const [threatening, setThreatening] = useState(null)
  const pieces = useRef([])

  const playerTurn = turn ? 'W' : 'B'

  const filledSquares = chessBoard
    .map((piece, pos) => piece && pos)

  function isCheck() {
    const contraryKing = chessBoard.findIndex(king => {
      return king?.name === playerTurn + "_KING"
    })

    threatening?.checkCheck(contraryKing, filledSquares)
  }

  useEffect(() => {
    isCheck()
  }, [threatening])

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
      setCheck,
      threatening,
      setThreatening,
      filledSquares,
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}