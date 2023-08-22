import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { CheckContext } from '../../context/CheckContext'


export default function Square({ square, position }) {
  const {
    currentBoard,
    setCurrentBoard,
    previousBoard,
    setPreviousBoard,
    lastMove,
    setLastMove,
    squares,
    setSquares,
    positions,
    setPositions,
    turn,
    setTurn,
    PLAYER,
    updateBoards,
    resetChess,
    updateChess,
    setLastMovement,
    isSamePlayer,
    filledSquares,
    fixedMoves,
    colorizedMoves,
    playerPieces
  } = useContext(ChessContext)

  const {
    threateningsMoves,
    kingPosition,
    kingCantMove,
    isCheck,
    isCheckMate,
    CURRENT_PIECES,
    CONTRARY_PIECES,
    CURRENT_MOVES,
    CONTRARY_MOVES,
    CURRENT_KING,
    CONTRARY_KING,
    IS_THREATENED,
    LEFT_IN_CHECK
  } = useContext(CheckContext)

  const squareColor = () => {
    const inCheck = IS_THREATENED || LEFT_IN_CHECK
    const isKing = CURRENT_KING === position
    const isMove = colorizedMoves().includes(position)

    return inCheck && isKing ? 'square check' : isMove ? 'square move' : 'square'
  }

  function handleSquare() {
    const startingMove = !squares.length
    const invalidSquare = !square
    const invalidPlayer = !isSamePlayer(square)

    if (startingMove && (invalidSquare || invalidPlayer)) { return }

    setSquares(squares => [...squares, square])
    setPositions(positions => [...positions, position])
  }

  return (
    <div
      className={squareColor()}
      id={position}
      onClick={handleSquare}
    >
      <div>
        <img
          className={square?.name.includes('PAWN') ? 'pawn  ' : 'piece'}
          src={square?.pic}
          alt={square?.name}
        />
        <span className='square-index'>
          {position}
        </span>
      </div>
    </div>
  )
}