import './square.css'
import { ChessContext } from '../../context/chessContext'
import { useContext } from 'react'


export default function Square({
  square,
  coord,
  isSamePlayer,
  updateCurrent,
  updateChess,
  isMoveValid,
  kingInCheck
}) {

  const { setCurrentEated } = useContext(ChessContext)


  function handleSquare() {
    const isPiece = square !== null
    const samePlayer = isSamePlayer(square)
    const validFirstClick = isPiece && samePlayer
    const validSecondClick = isMoveValid && !samePlayer

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
      className={`square grid place-items-center rounded transition duration-200 hover:bg-slate-500 active:scale-95 w-[calc((100vw-23px)/8)] h-[calc((100vw-23px)/8)] sm:w-[calc((100vh-23px)/8)] sm:h-[calc((100vh-23px)/8)] ${kingInCheck ? 'bg-red-300' : isMoveValid ? 'bg-slate-400' : ''}`}
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