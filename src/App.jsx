import './normalize.css'
import './app.css'
import ChessBoard from './components/ChessBoard/ChessBoard'
import PlayerTurnPanel from './components/PlayerTurn/PlayerTurnPanel'
import EatedPiecesPanel from './components/EatedPieces/EatedPiecesPanel'
import { useState } from 'react'
import { CHESS_BOARD } from './Game Functions/chessBoard'


export default function App() {
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

  const PROPS = {
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
  }

  return (
    <main>
      <EatedPiecesPanel {...PROPS} />
      <ChessBoard {...PROPS} />
      <PlayerTurnPanel {...PROPS} />
    </main>
  )
}