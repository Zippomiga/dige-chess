import './player-turn.css'
import blackTurn from '../../assets/chess-pieces/b-shift.png'
import whiteTurn from '../../assets/chess-pieces/w-shift.png'
import inCheck from '../../assets/chess-pieces/exclamation.png'
import { useContext, useState } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function PlayerTurn() {
  const {
    currentBoard,
    kingsPositions: { CURRENT_KING },
    checks: { IS_THREATENED, LEFT_IN_CHECK },
    turn,
    setLastMovement
  } = useContext(ChessContext)

  const isCheck = player => {
    const isInCheck = IS_THREATENED || LEFT_IN_CHECK
    const king = currentBoard[CURRENT_KING]

    return isInCheck && king.name.startsWith(player)
  }

  function handleLastMovement() {
    setLastMovement()
  }

  return (
    <div className='player-turn-panel'>

      <div>
        {isCheck('B') &&
          <img
            src={inCheck}
            className='turn-check'
            alt="" />}
        <img
          src={blackTurn}
          alt="black-shift"
          className={!turn ? 'player-turn' : 'player-turn current'}
        />
      </div>
      <div>
        {isCheck('W') &&
          <img
            src={inCheck}
            className='turn-check'
            alt="" />}
        <img
          src={whiteTurn}
          alt="white-shift"
          className={turn ? 'player-turn' : 'player-turn current'}
        />
      </div>
      <button onClick={handleLastMovement}>
        Last Movement
      </button>
    </div>
  )
}