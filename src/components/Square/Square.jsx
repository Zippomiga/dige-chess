import './square.css'


export default function Square({
  square,
  coord,
  isSamePlayer,
  updateCurrent,
  updateChess,
  kingInCheck,
  isMoveValid
}) {


  function handleSquare() {
    const isPiece = square !== null
    const samePlayer = isSamePlayer(square)
    const validFirstClick = samePlayer && isPiece
    const validSecondClick = !samePlayer && isMoveValid

    if (validFirstClick) { updateCurrent(square, coord) }
    if (validSecondClick) { updateChess(square, coord) }
  }


  return (
    <div
      className={
        kingInCheck ? 'square check' :
          isMoveValid ? 'square move' :
            'square'
      }
      id={coord}
      onClick={handleSquare}
    >
      <img
        className={
          square?.name.includes('PAWN')
            ? 'pawn'
            : 'piece'
        }
        src={square?.pic}
        alt={square?.name}
      />
    </div>
  )
}