import './eated-pieces.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function EatedPieces() {
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


  const eatedPieces = player => {
    const playerPieces = currentEated.filter(piece => {
      return piece.name.startsWith(player)
    })

    return (
      <div className='eated-player'>
        {playerPieces.map((piece, i) => {
          return (
            <img
              className='eated-piece'
              src={piece.pic}
              alt={piece.name}
              key={i}
            />
          )
        })}
      </div>
    )
  }


  return (
    <section className='eated-pieces'>
      {eatedPieces('B')}
      {eatedPieces('W')}
    </section>

  )
}