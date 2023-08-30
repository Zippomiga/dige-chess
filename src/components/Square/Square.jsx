import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { CheckContext } from '../../context/CheckContext'


export default function Square({ square, coord }) {
  const {
    currentBoard,
    setCurrentBoard,
    currentEated,
    setCurrentEated,
    previousBoard,
    setPreviousBoard,
    previousEated,
    setPreviousEated,
    lastMovement,
    setLastMovement,
    squares,
    setSquares,
    coords,
    setCoords,
    turn,
    setTurn,
    currentSquare,
    newSquare,
    currentCoord,
    newCoord,
    playerTurn,
    current,
    contrary,
    updateBoard,
    isSamePlayer,
    colorizedMoves,
    playerPieces,
    resetMoves,
    updateChess,
    setLastMove
  } = useContext(ChessContext)

  const {
    threatsMoves,
    kingPosition,
    // isCheck,
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


  const isCheck = IS_THREATENED && CURRENT_KING === coord
  const isMove = colorizedMoves().includes(coord)


  function handleSquare() {
    const startingMove = !squares.length
    const currentPlayer = isSamePlayer(square)
    const isPlayerEating = !currentPlayer && square !== null

    if (startingMove && !currentPlayer) { return }
    if (isMove && isPlayerEating) {
      setCurrentEated(currentEated => [...currentEated, square])
      setPreviousEated(currentEated)
    }

    setSquares(squares => [...squares, square])
    setCoords(coords => [...coords, coord])
  }


  return (
    <div
      className={isCheck ? 'square check' : isMove ? 'square move' : 'square'}
      id={coord}
      onClick={handleSquare}
    >
      <div>
        <img
          className={square?.name.includes('PAWN') ? 'pawn  ' : 'piece'}
          src={square?.pic}
          alt={square?.name}
        />
        <span className='square-index'>
          {coord}
        </span>
      </div>
    </div>
  )
}