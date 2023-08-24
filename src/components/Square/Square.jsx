import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { CheckContext } from '../../context/CheckContext'


export default function Square({ square, coord }) {
  const {
    currentBoard,
    setCurrentBoard,
    previousBoard,
    setPreviousBoard,
    lastMovement,
    setLastMovement,
    squares,
    setSquares,
    coords,
    setCoords,
    turn,
    setTurn,
    playerTurn,
    updateBoard,
    isSamePlayer,
    filledSquares,
    colorizedMoves,
    playerPieces,
    resetChess,
    updateChess,
    setLastMove
  } = useContext(ChessContext)

  const {
    threatsMoves,
    kingPosition,
    isCheck,
    isCheckMate,
    CURRENT_PIECES,
    CONTRARY_PIECES,
    CURRENT_MOVES,
    CONTRARY_MOVES,
    CURRENT_KING,
    CONTRARY_KING,
    IS_CHECK
  } = useContext(CheckContext)


  const squareColor = () => {
    const isKing = CURRENT_KING === coord
    const isMove = colorizedMoves().includes(coord)

    return IS_CHECK && isKing ? 'square check' : isMove ? 'square move' : 'square'
  }


  function handleSquare() {
    const startingMove = !squares.length
    const invalidSquare = !square || !isSamePlayer(square)
    
    if (startingMove && invalidSquare) { return }

    setSquares(squares => [...squares, square])
    setCoords(coords => [...coords, coord])
  }

  
  return (
    <div
      className={squareColor()}
      id={coord}
      onClick={handleSquare}
    >
      <div>
        <img
          className={square?.name.includes('PAWN') ? 'pawn  ' : 'piece'}
          src={square?.pic}
          alt={square?.name}
        />
        {/* <span className='square-index'>
          {coord}
        </span> */}
      </div>
    </div>
  )
}