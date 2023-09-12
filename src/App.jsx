import './normalize.css'
import './app.css'
import ChessBoard from './components/ChessBoard/ChessBoard'
import PlayerTurnPanel from './components/PlayerTurn/PlayerTurnPanel'
import EatedPiecesPanel from './components/EatedPieces/EatedPiecesPanel'
import { useState } from 'react'
import { CHESS_BOARD } from './Game Functions/chessBoard'
import { validCoord } from './Game Functions/auxiliar-functions'


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
  const current = 'current'
  const contrary = 'contrary'


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


  const getMovements = (piece, coord, board = currentBoard) => {
    return piece?.getMoves(coord, board).filter(validCoord)
  }


  const playerMoves = (player, board = currentBoard) => {
    const pieces = playerPieces(player, board)
    return pieces.map(piece => {
      const currentCoord = board.indexOf(piece)
      return getMovements(piece, currentCoord, board)
    })
  }


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
    playerTurn,
    current,
    contrary,
    isSamePlayer,
    playerPieces,
    getMovements,
    playerMoves
  }


  return (
    <main>
      <EatedPiecesPanel {...PROPS} />
      <ChessBoard {...PROPS} />
      <PlayerTurnPanel {...PROPS} />
    </main>
  )
}