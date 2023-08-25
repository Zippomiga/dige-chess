import './eated-pieces.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function EatedPieces() {
  const {
    currentBoard,
    setCurrentBoard,
    previousBoard,
    setPreviousBoard,
    lastMovement,
    setLastMovement,
    eatedPieces,
    setEatedPieces,
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


  const eatedPlayer = player => {
    const playerPieces = eatedPieces.filter(piece => {
      return piece.name.startsWith(player)
    })

    return (
      <div className='eated-player'>
        {playerPieces.map((piece, i) => {
          return (
            <div
              className='eated-piece'
              key={i}
            >
              <img
                src={piece.pic}
                alt={piece.name}
              />
            </div>
          )
        })}
      </div>
    )
  }


  return (
    <section className='eated-pieces'>
      {eatedPlayer('B')}
      {eatedPlayer('W')}
    </section>

  )
}