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
      className={`rounded-md grid place-items-center h-20 w-20 transition duration-200 hover:bg-slate-400 active:scale-95 ${kingInCheck
        ? 'bg-red-300 square'
        : isMoveValid
          ? 'bg-slate-300 square'
          : 'square'}`}
      id={coord}
      onClick={handleSquare}
    >
      <img
        className={square?.name.includes('PAWN') ? 'w-12 h-auto' : 'w-16 h-auto'}
        src={square?.pic}
        alt={square?.name}
      />
    </div>
  )
}