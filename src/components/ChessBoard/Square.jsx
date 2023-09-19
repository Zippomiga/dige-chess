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


  const classNameSquare = kingInCheck
    ? 'square check'
    : isMoveValid
      ? 'square move'
      : 'square'


  const classNamePiece = square?.name.includes('PAWN')
    ? 'pawn'
    : 'piece'


  return (
    <div
      className={classNameSquare}
      id={coord}
      onClick={handleSquare}
    >
      <img
        className={classNamePiece}
        src={square?.pic}
        alt={square?.name}
      />
    </div>
  )
}