import { COLUMNS } from "../Game Functions/auxiliar-functions";
import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState } from "react";

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

    const newBoard = updateBoard(currentCoord, currentCoord)
    const newContraryMoves = playerMoves(contrary, newBoard)
    const newThreatenings = newContraryMoves
      .filter(moves => moves.includes(currentKing()))

    const PLAYER_MOVES = currentSquare
      .getMoves(currentCoord, currentBoard)
      .filter(move => !isSamePlayer(currentBoard[move]))

    if (!newThreatenings.length) { // there's not threats, so it's not necessary fixing the movements
      return [...PLAYER_MOVES, currentCoord].includes(coord)
    }

    const FIXED_MOVES = PLAYER_MOVES.filter(move => { // it will filter the movements where the piece does not leave the king in check
      const newBoard = updateBoard(currentCoord, move, currentSquare)
      const newCurrentKing = currentKing(newBoard)
      const newContraryMoves = playerMoves(contrary, newBoard)
      
      return !isCheck(newCurrentKing, newContraryMoves)
    })

    return [...FIXED_MOVES, currentCoord].includes(coord)
  }



  const currentKing = (board = currentBoard) => {
    const currentPieces = playerPieces(current, board)
    const currentKing = currentPieces
      .find(king => king.name.includes('KING'))
    return board.indexOf(currentKing)
  }



  const isCheck = (
    newCurrentKing = currentKing(),
    newContraryMoves = playerMoves(contrary)
  ) => newContraryMoves
    .some(threat => threat.includes(newCurrentKing))



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
        const newCurrentKing = currentKing(newBoard)
        const newContraryMoves = playerMoves(contrary, newBoard)
        const NOT_CHECK_MATE = !isCheck(newCurrentKing, newContraryMoves)

        if (NOT_CHECK_MATE) { return false }
      }
    }
    console.log('CHECK MATE');
    return true
  }



  function resetMoves() {
    setSquares([])
    setCoords([])
  }



  function playerCanRecover() {
    const isPawn = currentSquare?.name.includes('PAWN')
    const C = COLUMNS.find(column => column.includes(newCoord))
    const W = isPawn && Math.min(...C) === newCoord
    const B = isPawn && Math.max(...C) === newCoord
  }



  function updateEatedPieces() {
    const isEating = newSquare !== null

    if (isEating) {
      setCurrentEated(currentEated => [...currentEated, newSquare])
      setPreviousEated(currentEated)
    }
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
      // playerCanRecover()
      updateEatedPieces()
      resetMoves()
    }
  }



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
      currentKing,
      isCheck,
      isCheckMate,
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}