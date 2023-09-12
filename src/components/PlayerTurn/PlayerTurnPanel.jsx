import './player-turn-panel.css'
import blackTurn from '../../assets/chess-pieces/b-shift.png'
import whiteTurn from '../../assets/chess-pieces/w-shift.png'
import { CHESS_BOARD } from '../../Game Functions/chessBoard'


export default function PlayerTurnPanel({
  setCurrentBoard,
  setCurrentEated,
  setCurrentMoves,
  setCurrentCoord,
  setCurrentSquare,
  previousBoard,
  setPreviousBoard,
  previousEated,
  setPreviousEated,
  lastMovement,
  setLastMovement,
  turn,
  setTurn
}) {

  function restartChess() {
    setCurrentBoard(CHESS_BOARD)
    setCurrentEated([])
    setCurrentMoves([])
    setCurrentCoord([])
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
    setCurrentCoord(null)
    setCurrentSquare(null)
    setTurn(turn => !turn)
  }


  const inCheck = player => {
    const isWhite = player === 'W'
    const playerPic = isWhite ? whiteTurn : blackTurn
    const playerTurn = isWhite ? turn : !turn

    return (
      <img
        src={playerPic}
        className={playerTurn ? 'player-turn' : 'player-turn disabled'}
        alt={player + ' turn'}
      />
    )
  }


  return (
    <section className='player-turn-panel'>
      {inCheck('B')}
      <button
        className={lastMovement ? 'button-last-movement' : 'button-last-movement disabled'}
        onClick={handleLastMove}
      >
        Last Movement
      </button>
      <button
        className='button-restart-chess'
        onClick={restartChess}
      >
        Restart Chess
      </button>
      {inCheck('W')}
    </section>
  )
}