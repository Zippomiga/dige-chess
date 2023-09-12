import './square.css'


export default function Square({
  square,
  coord,
  currentMoves,
  isSamePlayer,
  isCheck,
  currentKing,
  updateCurrent,
  updateChess
}) {

  const isMoveValid = currentMoves.includes(coord)
  const kingInCheck = isCheck() && currentKing() === coord

  function handleSquare() {
    const isPiece = square !== null
    const samePlayer = isSamePlayer(square)
    const validFirstClick = samePlayer && isPiece
    const validSecondClick = !samePlayer && isMoveValid

    if (validFirstClick) { updateCurrent(square, coord) }
    if (validSecondClick) { updateChess(square, coord) }
  }



  const classNameSquare =
    kingInCheck ? 'square check' :
      isMoveValid ? 'square move' :
        'square'


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