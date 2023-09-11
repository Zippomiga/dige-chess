import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function Square({ square, coord }) {
  const {
    currentBoard,
    setCurrentBoard,
    setPreviousBoard,
    currentEated,
    setCurrentEated,
    setPreviousEated,
    setLastMovement,
    currentMoves,
    setCurrentMoves,
    currentSquare,
    setCurrentSquare,
    currentCoord,
    setCurrentCoord,
    contrary,
    updateBoard,
    isSamePlayer,
    getMovements,
    playerMoves,
    currentKing,
    isCheck,
    resetPlayerTurn
  } = useContext(ChessContext)



  const isPiece = square !== null
  const isMoveValid = currentMoves.includes(coord)
  const kingInCheck = isCheck() && currentKing() === coord



  function updateCurrent() {
    const allMoves = getMovements(square, coord, currentBoard)

    const newMoves = allMoves.filter(move => {
      const newSquare = currentBoard[move]
      const newBoard = updateBoard(coord, move, square)
      const newCurrentKing = currentKing(newBoard)
      const newContraryMoves = playerMoves(contrary, newBoard)

      const samePlayer = isSamePlayer(newSquare)
      const leftInCheck = isCheck(newCurrentKing, newContraryMoves)

      return !samePlayer && !leftInCheck
    })

    const pieceMoves = newMoves.length === 0 ? [] : [...newMoves, coord]
    
    setCurrentMoves(pieceMoves)
    setCurrentCoord(coord)
    setCurrentSquare(square)
  }



  function updateEatedPieces() {
    if (!isPiece) { return }
    setPreviousEated(currentEated)
    setCurrentEated(currentEated => [...currentEated, square])
  }



  function updateChess() {
    const newBoard = updateBoard(currentCoord, coord, currentSquare)
    setCurrentBoard(newBoard)
    setPreviousBoard(currentBoard)
    setLastMovement(true)
    updateEatedPieces()
    resetPlayerTurn()
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