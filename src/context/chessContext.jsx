import { CHESS_BOARD } from "../Game Functions/chessBoard";
import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";


export const ChessContext = createContext()

export default function ChessContextProvider({ children }) {
  const [currentBoard, setCurrentBoard] = useLocalStorage('currentBoard', CHESS_BOARD)
  const [currentEated, setCurrentEated] = useLocalStorage('currentEated', [])
  const [previousBoard, setPreviousBoard] = useLocalStorage('previousBoard', [])
  const [previousEated, setPreviousEated] = useLocalStorage('previousEated', [])
  const [lastMovement, setLastMovement] = useLocalStorage('lastMovement', false)
  const [turn, setTurn] = useLocalStorage('turn', true)

  const [currentMoves, setCurrentMoves] = useState([])
  const [currentCoord, setCurrentCoord] = useState(null)
  const [currentSquare, setCurrentSquare] = useState(null)

  const playerTurn = turn ? 'W' : 'B'


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
      turn,
      setTurn,
      currentMoves,
      setCurrentMoves,
      currentCoord,
      setCurrentCoord,
      currentSquare,
      setCurrentSquare,
      playerTurn
    }}>
      {children}
    </ChessContext.Provider>
  )
}