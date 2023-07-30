import './player-turn.css'
import blackTurn from '../../assets/chess-pieces/b-shift.png'
import whiteTurn from '../../assets/chess-pieces/w-shift.png'
import inCheck from '../../assets/chess-pieces/exclamation.png'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function PlayerTurn() {
  const {
    check: { CONTRARY_KING, IS_CHECK },
    turn
  } = useContext(ChessContext)

  const isCheck = player => {
    return IS_CHECK && CONTRARY_KING?.name.startsWith(player)
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

    </div>
  )
}