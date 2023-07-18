import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useRef, useState, useEffect } from "react";

export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [chessBoard, setChessBoard] = useState(CHESS_BOARD)
  const [turn, setTurn] = useState(true)
  const pieces = useRef([])
  const playerTurn = turn ? 'W' : 'B'
  const [moves, setMoves] = useState([])
  const [check, setCheck] = useState(false)
  const [threatening, setThreatening] = useState('')

  const filledSquares = chessBoard
    .map((piece, pos) => piece && pos)

  function isCheck() {
    if (!threatening) return

    const contraryKing = chessBoard.findIndex(king => {
      const contrary = playerTurn + "_KING"
      return king?.name === contrary
    })

    threatening?.checkCheck(filledSquares, contraryKing)

    console.log({ contraryKing })
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