import './player-turn.css'
import blackShift from '../../assets/chess-pieces/b-shift.png'
import whiteShift from '../../assets/chess-pieces/w-shift.png'
import inCheck from '../../assets/chess-pieces/exclamation.png'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function PlayerTurn() {
  const { chess: { turn, check } } = useContext(ChessContext)

  return (
    <div className='player-turn-panel'>
      <img
        src={blackShift}
        alt="black-shift"
        className={!turn ? 'player-turn' : 'player-turn current'}
      />
      <img
        src={whiteShift}
        alt="white-shift"
        className={turn ? 'player-turn' : 'player-turn current'}
      />
      {
        check &&
        <span>JAQUE</span>
      }
    </div>
  )
}