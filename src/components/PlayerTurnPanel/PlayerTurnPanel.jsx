import './player-turn-panel.css'
import { CHESS_BOARD } from '../../Game Functions/chessBoard'
import { ChessContext } from '../../context/chessContext'
import { useContext } from 'react'
import blackTurn from '../../assets/chess-pieces/b-shift.png'
import whiteTurn from '../../assets/chess-pieces/w-shift.png'


export default function PlayerTurnPanel() {
  const {
    setCurrentBoard,
    setCurrentEated,
    previousBoard,
    setPreviousBoard,
    previousEated,
    setPreviousEated,
    lastMovement,
    setLastMovement,
    turn,
    setTurn,
    setCurrentMoves,
    setCurrentCoord,
    setCurrentSquare
  } = useContext(ChessContext)


  function restartChess() {
    setCurrentBoard(CHESS_BOARD)
    setCurrentEated([])
    setCurrentMoves([])
    setCurrentCoord(null)
    setCurrentSquare(null)
    setPreviousBoard([])
    setPreviousEated([])
    setLastMovement(false)
    setTurn(true)
  }


  function handleLastMove() {
    if (!lastMovement) { return }
    setLastMovement(false)
    setCurrentBoard(previousBoard)
    setCurrentEated(previousEated)
    setCurrentMoves([])
    setTurn(turn => !turn)
  }


  const PlayerTurn = ({ player }) => {
    const isWhite = player === 'W'
    const playerPic = isWhite ? whiteTurn : blackTurn
    const playerTurn = isWhite ? turn : !turn
    const className = playerTurn ? 'player-turn' : 'player-turn disabled'

    return (
      <img
        src={playerPic}
        className={className}
        alt={player + ' turn'}
      />
    )
  }


  const Button = ({ className, onClick, children }) => {
    return (
      <button
        className={className}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }


  return (
    <section className='player-turn-panel'>
      <PlayerTurn player='B' />
      <Button
        className={lastMovement ? 'last-move' : 'last-move disabled'}
        onClick={handleLastMove}
      >
        Last Move
      </Button>
      <Button
        className='restart-chess'
        onClick={restartChess}
      >
        Restart Chess
      </Button>
      <PlayerTurn player='W' />
    </section>
  )
}