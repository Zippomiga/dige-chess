import './eated-piece.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { COLUMNS } from '../../Game Functions/auxiliar-functions'

export default function EatedPiece({ pic, name }) {
  const {
    currentEated,
    currentSquare,
    newCoord
  } = useContext(ChessContext)

  
  function recoverPiece() {
    const isPawn = currentSquare?.name.includes('PAWN')
    const C = COLUMNS.find(column => column.includes(newCoord))
    const W = isPawn && Math.min(...C) === newCoord
    const B = isPawn && Math.max(...C) === newCoord

    console.log({ W, B });
  }

  return (
    <img
      onClick={recoverPiece}
      className='eated-piece'
      src={pic}
      alt={name}
    />
  )
}