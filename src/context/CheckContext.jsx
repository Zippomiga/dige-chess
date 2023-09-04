import { createContext, useContext, useEffect } from "react";
import { ChessContext } from "./ChessContext";
import { isCheck } from "../Game Functions/auxiliar-functions";


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
    updateBoard,
    isSamePlayer,
    playerPieces,
    isMoveValid,
    updateEatedPieces,
    resetMoves,
    updateChess,
  } = useContext(ChessContext)


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

  // const PLAYER_MOVES = currentSquare?.
  //   getMoves(currentCoord, currentBoard)
  //   .filter(move => {
  //     const square = currentBoard[move]
  //     return !isSamePlayer(square)
  //   }) ?? []


  useEffect(() => {
    if (squares.length === 2) { // player has clicked twice
      updateChess()
    }

    if (IS_THREATENED) {
      console.log('THREATENED');
      isCheckMate()
    }
  }, [squares])


  return (
    <CheckContext.Provider value={{
      threatsMoves,
      coordOfKing,
      isCheckMate,
      CURRENT_PIECES,
      CURRENT_MOVES,
      CURRENT_KING,
      CONTRARY_MOVES,
      IS_THREATENED
    }}>
      {props.children}
    </CheckContext.Provider>
  )
}