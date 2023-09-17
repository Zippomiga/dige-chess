import './eated-piece.css'
import { ChessContext } from '../../context/chessContext'
import { getPiece } from '../../Game Functions/auxiliar-functions'
import { useContext } from 'react'


export default function EatedPiece({ pic, name, coordOfPawn }) {
  const { setCurrentBoard, setCurrentEated } = useContext(ChessContext)


  function restorePiece() {
    if (name.includes('PAWN')) { return } // pawns can not be restored

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