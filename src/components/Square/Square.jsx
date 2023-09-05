import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function Square({ square, coord }) {
  const {
    squares,
    setSquares,
    setCoords,
    isSamePlayer,
    isMoveValid,
    currentKing,
    isCheck
  } = useContext(ChessContext)


  const inCheck = isCheck() && currentKing() === coord
  const isMove = isMoveValid(coord)


  function handleSquare() {
    const startingMove = !squares.length
    const invalidPlayer = !isSamePlayer(square)

    if (startingMove && invalidPlayer) { return }

    setSquares(squares => [...squares, square])
    setCoords(coords => [...coords, coord])
  }


  return (
    <div
      className={inCheck ? 'square check' : isMove ? 'square move' : 'square'}
      id={coord}
      onClick={handleSquare}
    >
      <div>
        <img
          className={square?.name.includes('PAWN') ? 'pawn  ' : 'piece'}
          src={square?.pic}
          alt={square?.name}
        />
        <span className='square-index'>
          {coord}
        </span>
      </div>
    </div>
  )
}