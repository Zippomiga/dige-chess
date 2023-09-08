import './player-turn.css'
import blackTurn from '../../assets/chess-pieces/b-shift.png'
import whiteTurn from '../../assets/chess-pieces/w-shift.png'
import kingInCheck from '../../assets/chess-pieces/exclamation.png'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function PlayerTurn() {
  const {
    currentBoard,
    setCurrentBoard,
    previousBoard,
    setCurrentEated,
    previousEated,
    lastMovement,
    setLastMovement,
    turn,
    currentKing,
    isCheck,
    resetPlayerTurn
  } = useContext(ChessContext)


  
  function handleLastMove() {
    if (!lastMovement) return
    setLastMovement(false)
    setCurrentBoard(previousBoard)
    setCurrentEated(previousEated)
    resetPlayerTurn()
  }



  const inCheck = player => {
    const king = currentBoard[currentKing()]
    const isKing = king.name.startsWith(player)
    const isWhite = player === 'W'

    const playerPic = isWhite ? whiteTurn : blackTurn
    const playerTurn = isWhite ? turn : !turn

    return (
      <div>
        {isCheck() && isKing && (
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
      <button
        className={lastMovement ? 'button-last-movement' : 'button-last-movement disabled'}
        onClick={handleLastMove}
      >
        Last Movement
      </button>
      {inCheck('W')}
    </section>
  )
}