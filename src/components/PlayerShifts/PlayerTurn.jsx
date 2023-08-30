import './player-turn.css'
import blackTurn from '../../assets/chess-pieces/b-shift.png'
import whiteTurn from '../../assets/chess-pieces/w-shift.png'
import kingInCheck from '../../assets/chess-pieces/exclamation.png'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { CheckContext } from '../../context/CheckContext'

export default function PlayerTurn() {
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
    colorizedMoves,
    playerPieces,
    resetMoves,
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
    IS_THREATENED,
    LEFT_IN_CHECK,
    // setLastMove
  } = useContext(CheckContext)


  function handleLastMove() {
    if (!lastMovement) return
    setLastMove()
    setLastMovement(false)
  }


  const inCheck = player => {
    const king = currentBoard[CURRENT_KING]
    const isKing = king.name.startsWith(player)
    const isWhite = player === 'W'

    const playerPic = isWhite ? whiteTurn : blackTurn
    const playerTurn = isWhite ? turn : !turn

    return (
      <div>
        {IS_THREATENED && isKing && (
          <img
            src={kingInCheck}
            className='turn-check'
            alt=""
          />
        )}
        <img
          src={playerPic}
          className={playerTurn ? 'player-turn' : 'player-turn current'}
          alt=""
        />
      </div>
    )
  }


  return (
    <section className='player-turn-panel'>
      {inCheck('B')}
      {inCheck('W')}
      <button onClick={handleLastMove}>
        Last Movement
      </button>
    </section>
  )
}