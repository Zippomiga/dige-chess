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
      className={'rounded-md bg-gray-200 h-12 w-12 p-1 hover:bg-green-300 active:scale-90 transition duration-75'}
      onClick={restorePiece}
      src={pic}
      alt={name}
    />
  )
}