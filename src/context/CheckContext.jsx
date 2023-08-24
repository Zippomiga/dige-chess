import { createContext, useContext, useEffect } from "react";
import { ChessContext } from "./ChessContext";

export const CheckContext = createContext()

export default function CheckContextProvider(props) {
  const {
    currentBoard,
    setCurrentBoard,
    previousBoard,
    setPreviousBoard,
    lastMovement,
    setLastMovement,
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
  } = useContext(ChessContext)


  const [current, contrary] = ['current', 'contrary']


  const threatsMoves = (player, board = currentBoard) => {
    const threatenings = playerPieces(player, board)

    return threatenings.map(threat => {
      const currentCoord = board.indexOf(threat)
      return threat?.getMoves(currentCoord, filledSquares(board))
    })
  }


  const kingPosition = (player, board = currentBoard) => {
    const currentKing = {
      'W': 'W_KING',
      'B': 'B_KING'
    }

    const contraryKing = {
      'W': 'B_KING',
      'B': 'W_KING'
    }

    return board.findIndex(king => {
      switch (player) {
        case 'current':
          return king?.name === currentKing[playerTurn]
        case 'contrary':
          return king?.name === contraryKing[playerTurn]
      }
    })
  }


  const isCheck = (threatsMoves, king) => {
    return threatsMoves.some(threatMove => {
      return threatMove?.includes(king)
    })
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
        const newContraryMoves = threatsMoves(contrary, newBoard)
        const newCurrentKing = kingPosition(current, newBoard)
        const NOT_CHECK_MATE = !isCheck(newContraryMoves, newCurrentKing)

        if (NOT_CHECK_MATE) { return false }
      }
    }
    return true
  }


  const CURRENT_PIECES = playerPieces(current)
  const CONTRARY_PIECES = playerPieces(contrary)

  const CURRENT_MOVES = threatsMoves(current)
  const CONTRARY_MOVES = threatsMoves(contrary)

  const CURRENT_KING = kingPosition(current)
  const CONTRARY_KING = kingPosition(contrary)

  const IS_THREATENED = isCheck(CONTRARY_MOVES, CURRENT_KING)
  const LEFT_IN_CHECK = isCheck(CURRENT_MOVES, CONTRARY_KING)

  const IS_CHECK = IS_THREATENED || LEFT_IN_CHECK

  
  useEffect(() => {
    if (squares.length === 2) { // player has clicked twice
      updateChess()
    }
    if (LEFT_IN_CHECK) {
      setLastMove()
    }
  }, [squares])


  useEffect(() => {
    if (IS_CHECK) {
      const checkMate = isCheckMate() ? 'CHECK MATE' : 'NOT CHECK MATE'
      console.log(checkMate);
    }
  }, [turn])


  return (
    <CheckContext.Provider value={{
      threatsMoves,
      kingPosition,
      isCheck,
      isCheckMate,
      CURRENT_PIECES,
      CONTRARY_PIECES,
      CURRENT_MOVES,
      CONTRARY_MOVES,
      CURRENT_KING,
      CONTRARY_KING,
      IS_CHECK
    }}>
      {props.children}
    </CheckContext.Provider>
  )
}