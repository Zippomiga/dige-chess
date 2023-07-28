import './player-turn.css'
import blackShift from '../../assets/chess-pieces/b-shift.png'
import whiteShift from '../../assets/chess-pieces/w-shift.png'
import inCheck from '../../assets/chess-pieces/exclamation.png'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function PlayerTurn() {
  const { chess } = useContext(ChessContext)

  const isCheck = player => {
    const { CONTRARY_KING, IS_CHECK } = chess.check
    const piece = chess.board[CONTRARY_KING]
    return IS_CHECK && piece?.name.startsWith(player)
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
          src={blackShift}
          alt="black-shift"
          className={!chess.turn ? 'player-turn' : 'player-turn current'}
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
          className={chess.turn ? 'player-turn' : 'player-turn current'}
        />
      </div>

    </div>
  )
}