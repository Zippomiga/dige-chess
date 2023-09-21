import './square.css'
import { ChessContext } from '../../context/chessContext'
import { useContext } from 'react'


export default function Square({
  square,
  coord,
  currentMoves,
  isSamePlayer,
  currentKing,
  isCheck,
  updateCurrent,
  updateChess
}) {

  const { setCurrentEated } = useContext(ChessContext)


  const isMoveValid = currentMoves.includes(coord)
  const kingInCheck = isCheck() && currentKing() === coord


  function handleSquare() {
    const isPiece = square !== null
    const samePlayer = isSamePlayer(square)
    const validFirstClick = samePlayer && isPiece
    const validSecondClick = !samePlayer && isMoveValid

    if (validFirstClick) {
      updateCurrent(square, coord)
    }

    if (validSecondClick) {
      if (isPiece) { // is eating
        setCurrentEated(currentEated => [...currentEated, square])
      }
      updateChess(coord)
    }
  }


  return (
    <div
      className={
        'rounded grid place-items-center h-16 w-16 transition duration-200 hover:bg-emerald-300 active:scale-90' + ' ' + (kingInCheck
          ? 'bg-red-400'
          : isMoveValid
            ? 'bg-emerald-200'
            : 'square')
      }
      id={coord}
      onClick={handleSquare}
    >
      <img
        className={square?.name.includes('PAWN') ? 'w-10 h-auto' : 'w-12 h-auto'}
        src={square?.pic}
        alt={square?.name}
      />
    </div>
  )
}