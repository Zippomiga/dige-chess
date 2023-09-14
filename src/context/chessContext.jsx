import { CHESS_BOARD } from "../Game Functions/chessBoard";
import { createContext, useState } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider({ children }) {
  const [currentBoard, setCurrentBoard] = useState(CHESS_BOARD)
  const [currentEated, setCurrentEated] = useState([])
  const [currentMoves, setCurrentMoves] = useState([])
  const [currentCoord, setCurrentCoord] = useState(null)
  const [currentSquare, setCurrentSquare] = useState(null)

  const [previousBoard, setPreviousBoard] = useState([])
  const [previousEated, setPreviousEated] = useState([])
  const [lastMovement, setLastMovement] = useState(false)
  const [turn, setTurn] = useState(true)

  const playerTurn = turn ? 'W' : 'B'


  return (
    <ChessContext.Provider value={{
      currentBoard,
      setCurrentBoard,
      currentEated,
      setCurrentEated,
      currentMoves,
      setCurrentMoves,
      currentCoord,
      setCurrentCoord,
      currentSquare,
      setCurrentSquare,
      previousBoard,
      setPreviousBoard,
      previousEated,
      setPreviousEated,
      lastMovement,
      setLastMovement,
      turn,
      setTurn,
      playerTurn
    }}>
      {children}
    </ChessContext.Provider>
  )
}