import { COLUMNS } from "../Game Functions/auxiliar-functions";
import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";

export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [currentBoard, setCurrentBoard] = useState(CHESS_BOARD)
  const [currentEated, setCurrentEated] = useState([])
  const [previousBoard, setPreviousBoard] = useState(currentBoard)
  const [previousEated, setPreviousEated] = useState([])
  const [lastMovement, setLastMovement] = useState(false)
  const [canRecover, setCanRecover] = useState(false)

  const [squares, setSquares] = useState([])
  const [coords, setCoords] = useState([])
  const [turn, setTurn] = useState(true)

  const [currentSquare, newSquare] = squares
  const [currentCoord, newCoord] = coords

  const playerTurn = turn ? 'W' : 'B'
  const current = 'current'
  const contrary = 'contrary'


  const updateBoard = (oldCoord, newCoord, newPiece = null) => {
    const newBoard = [...currentBoard]

    newBoard[oldCoord] = null
    newBoard[newCoord] = newPiece

    return newBoard
  }


  const isSamePlayer = square => {
    return square?.name.startsWith(playerTurn)
  }


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


  const playerMoves = (player, board = currentBoard) => {
    const pieces = playerPieces(player, board)
    return pieces.map(piece => {
      const currentCoord = board.indexOf(piece)
      return piece.getMoves(currentCoord, board)
    })
  }


  const isMoveValid = coord => {
    if (!currentSquare) return

    const PLAYER_MOVES = currentSquare
      .getMoves(currentCoord, currentBoard)
      .filter(move => !isSamePlayer(currentBoard[move]))

    const newBoard = updateBoard(currentCoord, currentCoord)
    const newContraryMoves = playerMoves(contrary, newBoard)
    const newThreats = newContraryMoves
      .filter(moves => moves.includes(CURRENT_KING))

    if (!newThreats.length) {
      return [...PLAYER_MOVES, currentCoord].includes(coord)
    }

    const FIXED_MOVEMENTS = PLAYER_MOVES.filter(move => {
      const newBoard = updateBoard(currentCoord, move, currentSquare)
      const newCurrentKing = coordOfKing(current, newBoard)
      const newContraryMoves = playerMoves(contrary, newBoard)

      return !isCheck(newCurrentKing, newContraryMoves)
    })

    return [...FIXED_MOVEMENTS, currentCoord].includes(coord)
  }


  function updateEatedPieces() {
    const isEating = newSquare !== null

    if (isEating) {
      setCurrentEated(currentEated => [...currentEated, newSquare])
      setPreviousEated(currentEated)
    }
  }


  const playerCanRecover = () => {
    const isPawn = currentSquare?.name.includes('PAWN')
    const C = COLUMNS.find(column => column.includes(newCoord))
    const W = isPawn && Math.min(...C) === newCoord
    const B = isPawn && Math.max(...C) === newCoord
  }


  function resetMoves() {
    setSquares([])
    setCoords([])
  }


  function updateChess() {
    const invalidMove = !isMoveValid(newCoord)
    const samePlayer = isSamePlayer(newSquare)
    const newBoard = updateBoard(...coords, currentSquare)

    if (invalidMove || samePlayer) {
      resetMoves()
    } else {
      setCurrentBoard(newBoard)
      setPreviousBoard(currentBoard)
      setLastMovement(true)
      setTurn(turn => !turn)
      updateEatedPieces()
      // playerCanRecover()
      resetMoves()
    }
  }


  const coordOfKing = (player, board = currentBoard) => {
    const pieces = playerPieces(player, board)
    const king = pieces.find(king => king.name.includes('KING'))
    return board.indexOf(king)
  }


  const isCheck = (newCurrentKing = null, newContraryMoves = null) => {
    const king = newCurrentKing ?? coordOfKing(current)
    const threatenings = newContraryMoves ?? playerMoves(contrary)
    return threatenings.some(threat => threat.includes(king))
  }


  const isCheckMate = () => {
    const CURRENT_PIECES = playerPieces(current)
    const CURRENT_MOVES = playerMoves(current)

    for (let i = 0; i < CURRENT_PIECES.length; i++) {
      const currentPiece = CURRENT_PIECES[i]
      const currentMoves = CURRENT_MOVES[i]
      const currentCoord = currentBoard.indexOf(currentPiece)

      for (let j = 0; j < currentMoves.length; j++) {
        const newCoord = currentMoves[j]
        const newSquare = currentBoard[newCoord]
        if (isSamePlayer(newSquare)) { continue }

        const newBoard = updateBoard(currentCoord, newCoord, currentPiece)
        const newContraryMoves = playerMoves(contrary, newBoard)
        const newCurrentKing = coordOfKing(current, newBoard)
        const NOT_CHECK_MATE = !isCheck(newCurrentKing, newContraryMoves)

        if (NOT_CHECK_MATE) { return false }
      }
    }
    console.log('CHECK MATE');
    return true
  }


  const CURRENT_KING = coordOfKing(current)


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
      isMoveValid,
      playerPieces,
      updateEatedPieces,
      playerCanRecover,
      resetMoves,
      updateChess,
      playerMoves,
      coordOfKing,
      isCheck,
      isCheckMate,
      CURRENT_KING,
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}