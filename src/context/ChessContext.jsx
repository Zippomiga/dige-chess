import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";

export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [chessBoard, setChessBoard] = useState(CHESS_BOARD)
  const [selectedSquares, setSelectedSquares] = useState([])
  const [positions, setPositions] = useState([])
  const [colorizedMoves, setColorizedMoves] = useState([])
  const [check, setCheck] = useState(false)
  const [turn, setTurn] = useState(true)

  const playerTurn = turn ? 'W' : 'B'
  const [PIECE_1, PIECE_2] = selectedSquares
  const [POS_1, POS_2] = positions

  const FILLED_SQUARES = chessBoard.map((piece, pos) => piece && pos)

  useEffect(() => {
    if (!PIECE_1) return

    const COLORIZED = PIECE_1.getMoves(POS_1, FILLED_SQUARES)

    const ilegalCoords = chessBoard
      .map((piece, pos) => piece?.name.startsWith(playerTurn) && pos)

    const COLORIZED_MOVES = COLORIZED.filter(move => !ilegalCoords.includes(move))

    setColorizedMoves(COLORIZED_MOVES)
  }, [selectedSquares])


  useEffect(() => {
    if (positions.length === 2) { // this means that the player has clicked twice
      const NEW_BOARD = [...chessBoard]

      NEW_BOARD[POS_1] = null
      NEW_BOARD[POS_2] = PIECE_1

      setChessBoard(NEW_BOARD)
      setTurn(turn => !turn)
      setColorizedMoves([])
    }
  }, [selectedSquares])


  useEffect(() => {
    if (positions.length === 2) { // this means that the player has clicked twice
      const CONTRARY_KING = chessBoard.findIndex(king => {
        const contrary = {
          'W': 'B_KING',
          'B': 'W_KING'
        }

        return king?.name === contrary[playerTurn]
      })

      const movesToCheck = PIECE_1.getMoves(POS_2, FILLED_SQUARES)
      const isCheck = movesToCheck?.includes(CONTRARY_KING)

      setCheck(isCheck)
      setPositions([])
      setSelectedSquares([])
    }
  }, [selectedSquares])


  useEffect(() => {
    console.log({ check })
  }, [chessBoard])

  return (
    <ChessContext.Provider value={{
      chessBoard,
      setSelectedSquares,
      setPositions,
      colorizedMoves
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}