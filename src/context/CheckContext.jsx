import { createContext, useContext, useEffect, useLayoutEffect } from "react";
import { ChessContext } from "./ChessContext";


export const CheckContext = createContext()

export default function CheckContextProvider(props) {
  const {
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
    colorizedMoves,
    playerPieces,
    resetMoves,
    updateChess,
    // setLastMove
  } = useContext(ChessContext)


  function setLastMove() {
    setCurrentBoard(previousBoard)
    setCurrentEated(previousEated)
    setTurn(turn => !turn)
    resetMoves()
  }


  const threatsMoves = (player, board = currentBoard) => {
    const threatenings = playerPieces(player, board)

    return threatenings.map(threat => {
      const currentCoord = board.indexOf(threat)
      return threat.getMoves(currentCoord, board)
    })
  }


  const kingCoord = (player, board = currentBoard) => {
    const pieces = playerPieces(player, board)
    const king = pieces.find(king => king.name.includes('KING'))

    return board.indexOf(king)
  }


  const isCheck = (threatsMoves, king) => {
    return threatsMoves.some(threatMove => {
      return threatMove.includes(king)
    })
  }


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
        const newCurrentKing = kingCoord(current, newBoard)
        const NOT_CHECK_MATE = !isCheck(newContraryMoves, newCurrentKing)

        if (NOT_CHECK_MATE) { return false }
      }
    }
    console.log('CHECK MATE');
    return true
  }


  const CURRENT_PIECES = playerPieces(current)
  const CONTRARY_PIECES = playerPieces(contrary)

  const CURRENT_MOVES = threatsMoves(current)
  const CONTRARY_MOVES = threatsMoves(contrary)

  const CURRENT_KING = kingCoord(current)
  const CONTRARY_KING = kingCoord(contrary)

  const IS_THREATENED = isCheck(CONTRARY_MOVES, CURRENT_KING)
  const LEFT_IN_CHECK = isCheck(CURRENT_MOVES, CONTRARY_KING)


  useEffect(() => {
    if (squares.length === 2) { // player has clicked twice
      updateChess()
    }

    if (IS_THREATENED) {
      console.log('THREATENED');
      setPreviousEated(currentEated)
      isCheckMate()
    }

    if (LEFT_IN_CHECK) {
      console.log('LEFT_IN_CHECK');
      setCurrentEated(previousEated)
      setCurrentBoard(previousBoard)
      setTurn(turn => !turn)
      resetMoves()
    }
  }, [squares, turn])


  return (
    <CheckContext.Provider value={{
      setLastMove,
      threatsMoves,
      kingCoord,
      isCheck,
      isCheckMate,
      CURRENT_PIECES,
      CONTRARY_PIECES,
      CURRENT_MOVES,
      CONTRARY_MOVES,
      CURRENT_KING,
      CONTRARY_KING,
      IS_THREATENED,
      LEFT_IN_CHECK
    }}>
      {props.children}
    </CheckContext.Provider>
  )
}