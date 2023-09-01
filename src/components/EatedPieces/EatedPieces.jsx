import './eated-pieces.css'
import { COLUMNS } from '../../Game Functions/auxiliar-functions'
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


  function recoverPiece() {
    const isPawn = currentSquare.name.includes('PAWN')
    const C = COLUMNS.find(column => column.includes(newCoord))
    const W = isPawn && Math.min(...C) === newCoord
    const B = isPawn && Math.max(...C) === newCoord

    console.log({ W, B });
  }


  const eatedPieces = player => {
    const playerPieces = currentEated.filter(piece => {
      return piece.name.startsWith(player)
    })

    return (
      <div className='eated-player'>
        {playerPieces.map(piece => {
          return (
            <img
              className='eated-piece'
              src={piece.pic}
              alt={piece.name}
              key={piece.name}
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