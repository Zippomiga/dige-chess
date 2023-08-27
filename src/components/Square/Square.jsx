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
    currentEated,
    setCurrentEated,
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
    setLastMove,
    setPreviousEated
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
    IS_THREATENED
  } = useContext(CheckContext)


  const isCheck = IS_THREATENED && CURRENT_KING === coord
  const isMove = colorizedMoves().includes(coord)


  function handleSquare() {
    const startingMove = !squares.length
    const currentPlayer = isSamePlayer(square)
    const isPlayerEating = !currentPlayer && square !== null

    if (startingMove && !currentPlayer) { return }
    if (!startingMove && isMove && isPlayerEating) {
      setPreviousEated(currentEated)
      setCurrentEated(currentEated => [...currentEated, square])
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
        {/* <span className='square-index'>
          {coord}
        </span> */}
      </div>
    </div>
  )
}