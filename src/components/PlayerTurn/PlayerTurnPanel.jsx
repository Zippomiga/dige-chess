import './player-turn-panel.css'
import blackTurn from '../../assets/chess-pieces/b-shift.png'
import whiteTurn from '../../assets/chess-pieces/w-shift.png'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function PlayerTurnPanel() {
  const {
    setCurrentBoard,
    previousBoard,
    setCurrentEated,
    previousEated,
    lastMovement,
    setLastMovement,
    turn,
    resetPlayerTurn
  } = useContext(ChessContext)



  function handleLastMove() {
    if (!lastMovement) { return }
    setLastMovement(false)
    setCurrentBoard(previousBoard)
    setCurrentEated(previousEated)
    resetPlayerTurn()
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
        Last Move
      </button>
      {inCheck('W')}
    </section>
  )
}