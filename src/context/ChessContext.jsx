import { CHESS_BOARD } from "../Game Functions/chessBoard";
import { createContext, useState } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [currentBoard, setCurrentBoard] = useState(CHESS_BOARD)
  const [currentEated, setCurrentEated] = useState([])
  const [currentMoves, setCurrentMoves] = useState([])
  const [currentCoord, setCurrentCoord] = useState(null)
  const [currentSquare, setCurrentSquare] = useState(null)

  const [previousBoard, setPreviousBoard] = useState(currentBoard)
  const [previousEated, setPreviousEated] = useState([])
  const [lastMovement, setLastMovement] = useState(false)
  const [turn, setTurn] = useState(true)

  const playerTurn = turn ? 'W' : 'B'


  const isSamePlayer = square => {
    return square?.name.startsWith(playerTurn)
  }


  function resetPlayerTurn() {
    setCurrentMoves([])
    setCurrentCoord(null)
    setCurrentSquare(null)
    setTurn(turn => !turn)
  }


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
      playerTurn,
      isSamePlayer,
      resetPlayerTurn
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}