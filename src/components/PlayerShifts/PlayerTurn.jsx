import './player-turn.css'
import blackShift from '../../assets/chess-pieces/b-shift.png'
import whiteShift from '../../assets/chess-pieces/w-shift.png'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function PlayerTurn() {
  const { turn } = useContext(ChessContext)

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
    </div>
  )
}