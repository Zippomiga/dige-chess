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


  const inCheck = player => {
    const king = currentBoard[CURRENT_KING]
    return IS_CHECK && king.name.startsWith(player)
  }


  function handleLastMove() {
    if (!lastMovement) return
    setLastMove()
    setLastMovement(false)
  }


  return (
    <div className='player-turn-panel'>
      <div>
        {inCheck('B') &&
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
        {inCheck('W') &&
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
      <button onClick={handleLastMove}>
        Last Movement
      </button>
    </div>
  )
}