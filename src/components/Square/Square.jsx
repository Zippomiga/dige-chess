import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function Square({ currPiece, currPosit }) {
  const {
    chess,
    setChess,
    PLAYER
  } = useContext(ChessContext)

  const isColorized = chess.moves?.includes(currPosit) ? 'square move' : 'square'
  const isPawn = currPiece?.name.includes('PAWN') ? 'pawn  ' : 'piece'

  function handleSquare() {
    if (chess.squares.length === 0) {
      const invalidSquare = !currPiece
      const invalidPlayer = !currPiece?.name.startsWith(PLAYER)

      if (invalidSquare || invalidPlayer) return
    }

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