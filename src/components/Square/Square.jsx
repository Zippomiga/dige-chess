import './square.css'
import { validCoord } from '../../Game Functions/auxiliar-functions'


export default function Square({
  currentBoard,
  setCurrentBoard,
  currentEated,
  setCurrentEated,
  currentMoves,
  setCurrentMoves,
  currentCoord,
  setCurrentCoord,
  currentSquare,
  setCurrentSquare,
  setPreviousBoard,
  setPreviousEated,
  setLastMovement,
  setTurn,
  square,
  coord,
  isSamePlayer,
  contrary,
  updateBoard,
  playerMoves,
  currentKing,
  isCheck
}) {

  const isPiece = square !== null
  const isMoveValid = currentMoves.includes(coord)
  const kingInCheck = isCheck() && currentKing() === coord


  function updateCurrent() {
    const allMoves = square
      .getMoves(coord, currentBoard)
      .filter(validCoord)

    const newMoves = allMoves.filter(move => {
      const newSquare = currentBoard[move]
      const newBoard = updateBoard(coord, move, square)
      const newCurrentKing = currentKing(newBoard)
      const newContraryMoves = playerMoves(contrary, newBoard)

      const samePlayer = isSamePlayer(newSquare)
      const leftInCheck = isCheck(newCurrentKing, newContraryMoves)

      return !samePlayer && !leftInCheck
    })

    const moves = newMoves.length === 0 ? [] : [...newMoves, coord]

    setCurrentMoves(moves)
    setCurrentCoord(coord)
    setCurrentSquare(square)
  }


  function updateEatedPieces() {
    const isPawn = square?.name.includes('PAWN')
    if (!isPiece || isPawn) { return }
    setCurrentEated(currentEated => [...currentEated, square])
    setPreviousEated(currentEated)
  }


  function updateChess() {
    const newBoard = updateBoard(currentCoord, coord, currentSquare)
    setCurrentBoard(newBoard)
    setCurrentMoves([])
    setCurrentCoord(null)
    setCurrentSquare(null)
    setPreviousBoard(currentBoard)
    setLastMovement(true)
    setTurn(turn => !turn)
    updateEatedPieces()
  }


  function handleSquare() {
    const samePlayer = isSamePlayer(square)
    const validFirstClick = samePlayer && isPiece
    const validSecondClick = !samePlayer && isMoveValid

    if (validFirstClick) { updateCurrent() }
    if (validSecondClick) { updateChess() }
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