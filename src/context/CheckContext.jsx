import { createContext, useContext, useEffect } from "react";
import { ChessContext } from "./ChessContext";

export const CheckContext = createContext()

export default function CheckContextProvider(props) {
  const {
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
    updateBoard,
    resetChess,
    updateChess,
    setLastMovement,
    isSamePlayer,
    filledSquares,
    fixedMoves,
    colorizedMoves,
    playerPieces
  } = useContext(ChessContext)


  const threateningsMoves = (player, board = currentBoard) => {
    const threatenings = playerPieces(player, board)

    return threatenings.map(threat => {
      const position = board.indexOf(threat)
      return threat?.getMoves(position, filledSquares(board))
    })
  }


  const kingPosition = (player, board = currentBoard) => {
    const current = {
      'W': 'W_KING',
      'B': 'B_KING'
    }

    const contrary = {
      'W': 'B_KING',
      'B': 'W_KING'
    }

    return board.findIndex(king => {
      switch (player) {
        case 'current':
          return king?.name === current[PLAYER]
        case 'contrary':
          return king?.name === contrary[PLAYER]
      }
    })
  }


  const isCheck = (threateningsMoves, king) => {
    return threateningsMoves.some(moves => moves.includes(king))
  }


  const isCheckMate = () => {
    for (let i = 0; i < CURRENT_PIECES.length; i++) {
      const currentPiece = CURRENT_PIECES[i]
      const currentMoves = CURRENT_MOVES[i]
      const currentCoord = currentBoard.indexOf(currentPiece)
      
      for (let j = 0; j < currentMoves.length; j++) {
        const newCoord = currentMoves[j]
        const newPiece = currentBoard[newCoord]
        if (isSamePlayer(newPiece)) { continue }

        const newBoard = updateBoard(currentCoord, newCoord, currentPiece)
        const newCurrentKing = kingPosition('current', newBoard)
        const newContraryMoves = threateningsMoves('contrary', newBoard)

        const NOT_CHECK_MATE = !isCheck(newContraryMoves, newCurrentKing)
        if (NOT_CHECK_MATE) { return false }
      }
    }
    return true
  }

  const CURRENT_PIECES = playerPieces('current')
  const CONTRARY_PIECES = playerPieces('contrary')

  const CURRENT_MOVES = threateningsMoves('current')
  const CONTRARY_MOVES = threateningsMoves('contrary')

  const CURRENT_KING = kingPosition('current')
  const CONTRARY_KING = kingPosition('contrary')

  const IS_THREATENED = isCheck(CONTRARY_MOVES, CURRENT_KING)
  const LEFT_IN_CHECK = isCheck(CURRENT_MOVES, CONTRARY_KING)


  useEffect(() => {
    if (squares.length === 2) { // player has clicked twice
      updateChess()
    }
    if (LEFT_IN_CHECK) {
      setLastMovement()
    }
  }, [squares])


  useEffect(() => {
    const isCheck = IS_THREATENED || LEFT_IN_CHECK
    const checkMate = isCheckMate() ? 'CHECK MATE' : 'NOT CHECK MATE'
    if (isCheck) { console.log(checkMate); }
  }, [turn])



  return (
    <CheckContext.Provider value={{
      threateningsMoves,
      kingPosition,
      // kingCantMove,
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