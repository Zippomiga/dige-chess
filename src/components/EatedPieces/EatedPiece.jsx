import './eated-piece.css'
import { ChessContext } from '../../context/chessContext'
import { getPiece } from '../../Game Functions/auxiliar-functions'
import { useContext } from 'react'


export default function EatedPiece({ pic, name, coordOfPawn, isPawnAtBorder }) {
  const {
    setCurrentBoard,
    setCurrentEated
  } = useContext(ChessContext)


  function restorePiece() {
    if (!isPawnAtBorder || name.includes('PAWN')) { // pawns can not be restored
      return
    }

    const pieceToRestore = getPiece(name)

    setCurrentBoard(currentBoard => {
      return [...currentBoard]
        .fill(pieceToRestore, coordOfPawn, coordOfPawn + 1)
    })

    setCurrentEated(currentEated => {
      return [...currentEated]
        .filter(eatedPiece => eatedPiece.name !== name)
    })
  }


  return (
    <img
      className='eated-piece'
      onClick={restorePiece}
      src={pic}
      alt={name}
    />
  )
}