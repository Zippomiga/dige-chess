import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function Square({ currPiece, currPosit }) {
  const {
    chess,
    setChess,
  } = useContext(ChessContext)

  const isColorized = chess.moves?.includes(currPosit) ? 'square move' : 'square'
  const isPawn = currPiece?.name.includes('PAWN') ? 'pawn  ' : 'piece'

  function handleSquare() {
    setChess(chess => {
      return {
        ...chess,
        squares: [...chess.squares, currPiece],
        positions: [...chess.positions, currPosit]
      }
    })
  }

  return (
    <div
      className={isColorized}
      id={currPosit}
      onClick={handleSquare}
    >
      <img
        className={isPawn}
        src={currPiece?.pic}
        alt={currPiece?.name}
      />
      <span className='square-index'>
        {currPosit}
      </span>
    </div>
  )
}