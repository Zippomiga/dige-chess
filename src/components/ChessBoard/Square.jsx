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
      updateChess(coord)
      if (isPiece) { // is eating
        setCurrentEated(currentEated => [...currentEated, square])
      }
    }
  }


  return (
    <div
      className={`rounded grid place-items-center transition duration-200 hover:bg-slate-500 active:scale-95 h-10 w-10 xs:w-12 xs:h-12 sm:h-14 sm:w-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 ${kingInCheck
        ? 'bg-red-300 square'
        : isMoveValid
          ? 'bg-slate-400 square'
          : 'square'}`}
      id={coord}
      onClick={handleSquare}
    >
      <img
        className={square?.name.includes('PAWN') ? 'w-3/5 h-auto' : 'w-4/5 h-auto'}
        src={square?.pic}
        alt={square?.name}
      />
    </div>
  )
}