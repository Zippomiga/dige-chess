import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [currentBoard, setCurrentBoard] = useState(CHESS_BOARD)
  const [previousBoard, setPreviousBoard] = useState([])
  const [lastMovement, setLastMovement] = useState(false)
  const [eatedPieces, setEatedPieces] = useState([])

  const [squares, setSquares] = useState([])
  const [coords, setCoords] = useState([])
  const [turn, setTurn] = useState(true)

  const [currentSquare, newSquare] = squares
  const [currentCoord, newCoord] = coords

  const playerTurn = turn ? 'W' : 'B'

  const updateBoard = (currentCoord, newCoord, newPiece) => {
    const newBoard = [...currentBoard]
    newBoard[currentCoord] = null
    newBoard[newCoord] = newPiece

    return newBoard
  }


  const isSamePlayer = square => {
    return square?.name.startsWith(playerTurn)
  }


  const filledSquares = (board = currentBoard) => {
    return board.map((filled, coord) => {
      return filled && coord
    })
  }


  const colorizedMoves = () => {
    const movements = currentSquare
      ?.getMoves(currentCoord, filledSquares()) || []

    const colorized = movements.filter(move => {
      return !isSamePlayer(currentBoard[move])
    })

    return [...colorized, currentCoord]
  } // not taken into account squares where there are pieces of the same player


  const playerPieces = (player, board = currentBoard) => {
    return board.filter(piece => {
      switch (player) {
        case 'current':
          return isSamePlayer(piece)
        case 'contrary':
          return !isSamePlayer(piece)
      }
    })
  }


  // const eatedPieces = {}


  function resetChess() {
    setSquares([])
    setCoords([])
    setLastMovement(true)
  }


  function updateChess() {
    const newBoard = updateBoard(...coords, currentSquare)
    const invalidMove = !colorizedMoves().includes(newCoord)
    const samePlayer = isSamePlayer(newSquare)

    if (invalidMove || samePlayer) {
      resetChess()
    } else {
      setPreviousBoard(currentBoard)
      setCurrentBoard(newBoard)
      resetChess()
      setTurn(turn => !turn)
    }
  }


  function setLastMove() {
    resetChess()
    setCurrentBoard(previousBoard)
    setTurn(turn => !turn)
  }


  return (
    <ChessContext.Provider value={{
      currentBoard,
      setCurrentBoard,
      previousBoard,
      setPreviousBoard,
      lastMovement,
      setLastMovement,
      eatedPieces,
      setEatedPieces,
      squares,
      setSquares,
      coords,
      setCoords,
      turn,
      setTurn,
      playerTurn,
      updateBoard,
      isSamePlayer,
      filledSquares,
      colorizedMoves,
      playerPieces,
      resetChess,
      updateChess,
      setLastMove
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}