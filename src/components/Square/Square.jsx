import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function Square({ square, position }) {
  const {
    kings: { CURRENT_KING, CONTRARY_KING },
    check: { IS_THREATENING, LEFT_IN_CHECK },
    colorizedMoves,
    squares,
    setSquares,
    setPositions,
    PLAYER
  } = useContext(ChessContext)


  const squareColor = () => {
    const inCheck = IS_THREATENING || LEFT_IN_CHECK
    const isKing = CURRENT_KING === position
    const isMove = colorizedMoves?.includes(position)

    return inCheck && isKing ? 'square check' : isMove ? 'square move' : 'square'
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