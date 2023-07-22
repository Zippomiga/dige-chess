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

  // const [chess, setChess] = useState({
  //   chessBoard: CHESS_BOARD,
  //   selectedSquares: [],
  //   positions: [],
  //   colorizedMoves: [],
  //   check: false,
  //   turn: true
  // })

  const FILLED_SQUARES = chessBoard.map((piece, pos) => piece && pos)
  const [PIECE_1, PIECE_2] = selectedSquares
  const [POS_1, POS_2] = positions
  const PLAYER = turn ? 'W' : 'B'

  // function invalid() {
  //   const invalidSquare = PIECE_1 === null
  //   const invalidMove = !colorizedMoves?.includes(POS_2)

  //   const invalidPlayer = !PIECE_1?.name.startsWith(PLAYER)
  //   const samePlayer = PIECE_1?.name.startsWith(PIECE_2?.name[0])
  //   return invalidSquare || invalidPlayer || invalidMove || samePlayer
  // }

  function updateChess() {
    const NEW_BOARD = [...chessBoard]

    NEW_BOARD[POS_1] = null
    NEW_BOARD[POS_2] = PIECE_1

    setChessBoard(NEW_BOARD)
  }

  function checkCheck() {
    const CONTRARY_KING = chessBoard.findIndex(king => {
      const contrary = {
        'W': 'B_KING',
        'B': 'W_KING'
      }

      return king?.name === contrary[PLAYER]
    })

    const movesToCheck = PIECE_1.getMoves(POS_2, FILLED_SQUARES)
    const isCheck = movesToCheck.includes(CONTRARY_KING)

    setCheck(isCheck)
  }

  useEffect(() => {
    const MOVES = PIECE_1?.getMoves(POS_1, FILLED_SQUARES)
      .filter(move => !chessBoard[move]?.name.startsWith(PLAYER))

    setColorizedMoves(MOVES)

    if (selectedSquares.length === 2) { // this means that the player has clicked twice
      updateChess()
      checkCheck()
      setSelectedSquares([])
      setPositions([])
      setColorizedMoves([])
      setTurn(turn => !turn)
    }
  }, [selectedSquares])


  return (
    <ChessContext.Provider value={{
      chessBoard,
      setSelectedSquares,
      setPositions,
      colorizedMoves,
      turn
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}