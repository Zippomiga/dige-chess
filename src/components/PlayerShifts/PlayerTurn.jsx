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

  const isCheck = player => {
    const inCheck = IS_THREATENED || LEFT_IN_CHECK
    const king = currentBoard[CURRENT_KING]

    return inCheck && king.name.startsWith(player)
  }

  function handleLastMovement() {
    if (!lastMove) return
    setLastMovement()
    setLastMove(false)
  }

  return (
    <div className='player-turn-panel'>
      <div>
        {isCheck('B') &&
          <img
            src={kingInCheck}
            className='turn-check'
            alt="" />}
        <img
          src={blackTurn}
          alt="black-shift"
          className={!turn ? 'player-turn' : 'player-turn current'}
        />
      </div>
      <div>
        {isCheck('W') &&
          <img
            src={kingInCheck}
            className='turn-check'
            alt="" />}
        <img
          src={whiteTurn}
          alt="white-shift"
          className={turn ? 'player-turn' : 'player-turn current'}
        />
      </div>
      <button onClick={handleLastMovement}>
        Last Movement
      </button>
    </div>
  )
}