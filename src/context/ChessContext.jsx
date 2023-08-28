import { COLUMNS, findColumn } from "../Game Functions/auxiliar-functions";
import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [currentBoard, setCurrentBoard] = useState(CHESS_BOARD)
  const [currentEated, setCurrentEated] = useState([])
  const [previousBoard, setPreviousBoard] = useState([])
  const [previousEated, setPreviousEated] = useState([])
  const [lastMovement, setLastMovement] = useState(false)

  const [squares, setSquares] = useState([])
  const [coords, setCoords] = useState([])
  const [turn, setTurn] = useState(true)

  const [currentSquare, newSquare] = squares
  const [currentCoord, newCoord] = coords

  const playerTurn = turn ? 'W' : 'B'
  const current = 'current'
  const contrary = 'contrary'


  const updateBoard = (oldCoord, newCoord, newPiece) => {
    const newBoard = [...currentBoard]

    newBoard[oldCoord] = null
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
    const movements = currentSquare?.
      getMoves(currentCoord, filledSquares()) || []

    const colorized = movements.filter(move => {
      const square = currentBoard[move]
      return !isSamePlayer(square)
    })

    return [...colorized, currentCoord]
  } // not taken into account squares where there are pieces of the same player


  const playerPieces = (player, board = currentBoard) => {
    return board.filter(piece => {
      switch (player) {
        case current:
          return piece !== null && isSamePlayer(piece)
        case contrary:
          return piece !== null && !isSamePlayer(piece)
      }
    })
  }


  function resetMoves() {
    setSquares([])
    setCoords([])
  }


  function updateChess() {
    const clickedTwice = squares.length === 2
    const invalidMove = !colorizedMoves().includes(newCoord)
    const newBoard = updateBoard(...coords, currentSquare)

    if (clickedTwice) {
      if (invalidMove || isSamePlayer(newSquare)) {
        resetMoves()
      } else {
        setCurrentBoard(newBoard)
        setPreviousBoard(currentBoard)
        setLastMovement(true)
        setTurn(turn => !turn)
        recoverPiece()
        resetMoves()
      }
    }
  }


  function setLastMove() {
    setCurrentBoard(previousBoard)
    setCurrentEated(previousEated)
    setTurn(turn => !turn)
    resetMoves()
  }


  function recoverPiece() {
    const c = findColumn(newCoord)
    const C = COLUMNS[c]

    const W = Math.min(...C) === newCoord
    const B = Math.max(...C) === newCoord

    console.log({ W, B });
  }


  useEffect(() => {
    updateChess()
  }, [squares])


  return (
    <ChessContext.Provider value={{
      currentBoard,
      setCurrentBoard,
      currentEated,
      setCurrentEated,
      previousBoard,
      setPreviousBoard,
      previousEated,
      setPreviousEated,
      lastMovement,
      setLastMovement,
      squares,
      setSquares,
      coords,
      setCoords,
      turn,
      setTurn,
      currentSquare,
      newSquare,
      currentCoord,
      newCoord,
      playerTurn,
      current,
      contrary,
      updateBoard,
      isSamePlayer,
      filledSquares,
      colorizedMoves,
      playerPieces,
      // resetMoves,
      updateChess,
      setLastMove
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}