import { CHESS_BOARD } from "../Game Functions/chessBoard";
import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";


export const ChessContext = createContext()

export default function ChessContextProvider({ children }) {
  const [currentBoard, setCurrentBoard] = useLocalStorage('currentBoard', CHESS_BOARD)
  const [currentEated, setCurrentEated] = useState([])
  const [currentMoves, setCurrentMoves] = useLocalStorage('currentMoves', [])
  const [currentCoord, setCurrentCoord] = useLocalStorage('currentCoord', null)
  const [currentSquare, setCurrentSquare] = useLocalStorage('currentSquare', null)

  const [previousBoard, setPreviousBoard] = useLocalStorage('previousBoard', [])
  const [previousEated, setPreviousEated] = useState([])
  const [lastMovement, setLastMovement] = useLocalStorage('lastMovement', false)
  const [turn, setTurn] = useLocalStorage('turn', true)

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