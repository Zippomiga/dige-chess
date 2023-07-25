import './player-turn.css'
import blackShift from '../../assets/chess-pieces/b-shift.png'
import whiteShift from '../../assets/chess-pieces/w-shift.png'
import inCheck from '../../assets/chess-pieces/exclamation.png'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function PlayerTurn() {
  const { chess: {
    board,
    turn,
    check: { IS_CHECK, CONTRARY_KING }
  } } = useContext(ChessContext)

  const isCheck = player => IS_CHECK && board[CONTRARY_KING]?.name.startsWith(player)

  return (
    <div className='player-turn-panel'>

      <div>
        {isCheck('B') &&
          <img
            src={inCheck}
            className='turn-check'
            alt="" />}
        <img
          src={blackShift}
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
          src={whiteShift}
          alt="white-shift"
          className={turn ? 'player-turn' : 'player-turn current'}
        />
      </div>

    </div>
  )
}