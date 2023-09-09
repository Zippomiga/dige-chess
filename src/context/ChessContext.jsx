import { validCoord } from "../Game Functions/auxiliar-functions";
import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [currentBoard, setCurrentBoard] = useState(CHESS_BOARD)
  const [previousBoard, setPreviousBoard] = useState(currentBoard)

  const [currentEated, setCurrentEated] = useState([])
  const [previousEated, setPreviousEated] = useState([])

  const [lastMovement, setLastMovement] = useState(false)
  const [turn, setTurn] = useState(true)

  const [currentMovements, setCurrentMovements] = useState([])
  const [currentSquare, setCurrentSquare] = useState(null)
  const [currentCoord, setCurrentCoord] = useState(null)

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



  const getMovements = (piece, coord, board) => {
    const movements = piece.getMoves(coord, board)
    return movements.filter(validCoord)
  }



  const playerMoves = (player, board = currentBoard) => {
    const pieces = playerPieces(player, board)
    return pieces.map(piece => {
      const currentCoord = board.indexOf(piece)
      return getMovements(piece, currentCoord, board)
    })
  }



  const currentKing = (board = currentBoard) => {
    const currentPieces = playerPieces(current, board)
    const currentKing = currentPieces.find(king => king.name.includes('KING'))
    return board.indexOf(currentKing)
  }



  const isCheck = (king = currentKing(), movements = playerMoves(contrary)) => {
    return movements.some(moves => moves.includes(king))
  }



  function resetPlayerTurn() {
    setCurrentMovements([])
    setCurrentSquare(null)
    setCurrentCoord(null)
    setTurn(turn => !turn)
  }



  return (
    <ChessContext.Provider value={{
      currentBoard,
      setCurrentBoard,
      previousBoard,
      setPreviousBoard,
      currentEated,
      setCurrentEated,
      previousEated,
      setPreviousEated,
      lastMovement,
      setLastMovement,
      turn,
      setTurn,
      currentMovements,
      setCurrentMovements,
      currentSquare,
      setCurrentSquare,
      currentCoord,
      setCurrentCoord,
      playerTurn,
      current,
      contrary,
      updateBoard,
      isSamePlayer,
      playerPieces,
      getMovements,
      playerMoves,
      currentKing,
      isCheck,
      resetPlayerTurn
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}