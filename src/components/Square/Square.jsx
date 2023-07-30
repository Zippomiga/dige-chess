import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function Square({ square, position }) {
  const {
    check: { KING_POSITION, IS_CHECK },
    moves,
    squares,
    setSquares,
    positions,
    setPositions,
    PLAYER
  } = useContext(ChessContext)


  const squareColor = () => {
    const isKing = IS_CHECK && KING_POSITION === position
    const isMove = moves?.includes(position)

    return isKing ? 'square check' : isMove ? 'square move' : 'square'
  }

  function handleSquare() {
    const startingMove = !squares.length
    const invalidSquare = !square
    const invalidPlayer = !square?.name.startsWith(PLAYER)

    if (startingMove && (invalidSquare || invalidPlayer)) return

    setSquares(squares => [...squares, square])
    setPositions(positions => [...positions, position])
  }

  return (
    <div
      className={squareColor()}
      id={position}
      onClick={handleSquare}
    >
      <img
        className={square?.name.includes('PAWN') ? 'pawn  ' : 'piece'}
        src={square?.pic}
        alt={square?.name}
      />
      <span className='square-index'>
        {position}
      </span>
    </div>
  )
}