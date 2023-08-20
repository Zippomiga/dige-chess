import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [currentBoard, setCurrentBoard] = useState(CHESS_BOARD)
  const [previousBoard, setPreviousBoard] = useState([])
  const [lastMove, setLastMove] = useState(false)

  const [squares, setSquares] = useState([])
  const [positions, setPositions] = useState([])
  const [turn, setTurn] = useState(true)

  const [SQUARE_1, SQUARE_2] = squares
  const [POSITION_1, POSITION_2] = positions

  const PLAYER = turn ? 'W' : 'B'


  function updateBoards() {
    const NEW_BOARD = [...currentBoard]

    NEW_BOARD[POSITION_1] = null
    NEW_BOARD[POSITION_2] = SQUARE_1

    setPreviousBoard(currentBoard)
    setCurrentBoard(NEW_BOARD)
  }


  function resetChess() {
    setSquares([])
    setPositions([])
    setLastMove(true)
  }


  function updateChess() {
    const invalidMove = !colorizedMoves().includes(POSITION_2)
    const samePlayer = SQUARE_1?.name.startsWith(SQUARE_2?.name[0])

    if (invalidMove || samePlayer) {
      resetChess()
    } else {
      updateBoards()
      resetChess()
      setTurn(turn => !turn)
    }
  }


  function setLastMovement() {
    resetChess()
    setCurrentBoard(previousBoard)
    setTurn(turn => !turn)
  }


  const filledSquares = (board = currentBoard) => {
    return board.map((filled, position) => filled && position)
  }


  const fixedMoves = movements => {
    return movements.filter(move => {
      const piece = currentBoard[move]
      return !piece?.name.startsWith(PLAYER)
    })
  } // not taken into account squares where there are pieces of the same player


  const colorizedMoves = () => {
    const movements = SQUARE_1?.getMoves(POSITION_1, filledSquares()) || []
    const colorized = fixedMoves(movements)
    return [...colorized, POSITION_1]
  }


  const playerPieces = (player, board = currentBoard) => {
    return board.filter(threat => {
      switch (player) {
        case 'current':
          return threat !== null && threat.name.startsWith(PLAYER)
        case 'contrary':
          return threat !== null && !threat.name.startsWith(PLAYER)
      }
    })
  }


  return (
    <ChessContext.Provider value={{
      currentBoard,
      setCurrentBoard,
      previousBoard,
      setPreviousBoard,
      lastMove,
      setLastMove,
      squares,
      setSquares,
      positions,
      setPositions,
      turn,
      setTurn,
      PLAYER,
      updateBoards,
      resetChess,
      updateChess,
      setLastMovement,
      filledSquares,
      fixedMoves,
      colorizedMoves,
      playerPieces
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}