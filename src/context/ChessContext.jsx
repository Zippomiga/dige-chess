import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [currentBoard, setCurrentBoard] = useState(CHESS_BOARD)
  const [currentEated, setCurrentEated] = useState([])
  const [previousBoard, setPreviousBoard] = useState(currentBoard)
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
  const isEating = newSquare !== null


  const updateBoard = (oldCoord, newCoord, newPiece) => {
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


  const isMoveValid = coord => {
    const movements = currentSquare?.getMoves(currentCoord, currentBoard) ?? []
    const colorized = movements.filter(move => {
      const samePlayer = isSamePlayer(currentBoard[move])
      
      const newBoard = updateBoard(currentCoord, move, currentSquare)
      const newContraryMoves = threatsMoves(contrary, newBoard)
      const newCurrentKing = coordOfKing(current, newBoard)
  
      const leftInCheck = isCheck(newContraryMoves, newCurrentKing)


      return !samePlayer && !leftInCheck
    })

    return [...colorized, currentCoord].includes(coord)
  }


  function updateEatedPieces() {
    if (isEating) {
      setCurrentEated(currentEated => [...currentEated, newSquare])
      setPreviousEated(currentEated)
    }
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
      resetMoves()
    }
  }


  const threatsMoves = (player, board = currentBoard) => {
    const threatenings = playerPieces(player, board)

    return threatenings.map(threat => {
      const currentCoord = board.indexOf(threat)
      return threat.getMoves(currentCoord, board)
    })
  }


  const coordOfKing = (player, board = currentBoard) => {
    const pieces = playerPieces(player, board)
    const king = pieces.find(king => king.name.includes('KING'))
    return board.indexOf(king)
  }


  const isCheck = (threatsMoves, king) => {
    return threatsMoves.some(threatMove => {
      return threatMove.includes(king)
    })
  }


  // const keepInCheck = (currentCoord, newCoord, newSquare) => {
  //   const newBoard = updateBoard(currentCoord, newCoord, newSquare)
  //   const newContraryMoves = threatsMoves(contrary, newBoard)
  //   const newCurrentKing = coordOfKing(current, newBoard)

  //   return isCheck(newContraryMoves, newCurrentKing)
  // }


  const isCheckMate = () => {
    for (let i = 0; i < CURRENT_PIECES.length; i++) {
      const currentPiece = CURRENT_PIECES[i]
      const currentMoves = CURRENT_MOVES[i]
      const currentCoord = currentBoard.indexOf(currentPiece)

      for (let j = 0; j < currentMoves.length; j++) {
        const newCoord = currentMoves[j]
        const newSquare = currentBoard[newCoord]
        if (isSamePlayer(newSquare)) { continue }

        const newBoard = updateBoard(currentCoord, newCoord, currentPiece)
        const newContraryMoves = threatsMoves(contrary, newBoard)
        const newCurrentKing = coordOfKing(current, newBoard)        

        const NOT_CHECK_MATE = !isCheck(newContraryMoves, newCurrentKing)
        if (NOT_CHECK_MATE) { return false }
      }
    }
    console.log('CHECK MATE');
    return true
  }


  const CURRENT_PIECES = playerPieces(current)
  const CURRENT_MOVES = threatsMoves(current)
  const CURRENT_KING = coordOfKing(current)
  const CONTRARY_MOVES = threatsMoves(contrary)

  const IS_THREATENED = isCheck(CONTRARY_MOVES, CURRENT_KING)


  useEffect(() => {
    if (squares.length === 2) { // player has clicked twice
      updateChess()
    }

    if (IS_THREATENED) {
      console.log('THREATENED');
      isCheckMate()
    }
  }, [squares, turn])


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
      isEating,
      updateBoard,
      isSamePlayer,
      isMoveValid,
      playerPieces,
      updateEatedPieces,
      resetMoves,
      updateChess,
      threatsMoves,
      coordOfKing,
      isCheck,
      keepInCheck,
      isCheckMate,
      CURRENT_PIECES,
      CURRENT_MOVES,
      CURRENT_KING,
      CONTRARY_MOVES,
      IS_THREATENED,
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}