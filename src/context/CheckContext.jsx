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
    updateBoards,
    resetChess,
    updateChess,
    setLastMovement,
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


  const kingPosition = player => {
    const current = {
      'W': 'W_KING',
      'B': 'B_KING'
    }

    const contrary = {
      'W': 'B_KING',
      'B': 'W_KING'
    }

    return currentBoard.findIndex(king => {
      switch (player) {
        case 'current':
          return king?.name === current[PLAYER]
        case 'contrary':
          return king?.name === contrary[PLAYER]
      }
    })
  }


  const kingCantMove = () => {
    const king = currentBoard[CURRENT_KING]
    const moves = king.getMoves(CURRENT_KING, filledSquares())
    const kingMoves = fixedMoves(moves)

    return kingMoves.every(kingMove => {
      return CONTRARY_MOVES.flat().includes(kingMove)
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

      const isKing = currentPiece.name.includes("KING")
      const notMovesToCheck = !currentMoves.length

      if (isKing || notMovesToCheck) { continue }

      for (let j = 0; j < currentMoves.length; j++) {
        const newCoord = currentMoves[j]
        const newBoard = [...currentBoard]

        newBoard[currentCoord] = null
        newBoard[newCoord] = currentPiece

        const newMovements = threateningsMoves('contrary', newBoard)
        const contraryMoves = [...new Set(newMovements.flat())]

        const allPiecesChecked = (CURRENT_PIECES.length - 1) === i
        const allMovesChecked = (currentMoves.length - 1) === j

        const NOT_CHECK_MATE = !contraryMoves.includes(CURRENT_KING)
        const IS_CHECK_MATE = allMovesChecked && allPiecesChecked

        if (NOT_CHECK_MATE) { return false }
        if (IS_CHECK_MATE) { return true }
      }
    }
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
    if ((IS_THREATENED || LEFT_IN_CHECK) && kingCantMove()) {
      const checkMate = isCheckMate() ? 'CHECK MATE' : 'NOT CHECK MATE'
      console.log(checkMate);
    }
  }, [turn])



  return (
    <CheckContext.Provider value={{
      threateningsMoves,
      kingPosition,
      kingCantMove,
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