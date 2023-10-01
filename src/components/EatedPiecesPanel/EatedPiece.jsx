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
      className={'rounded-sm  bg-gray-200 h-6 w-6 sm:w-8 sm:h-8 md:h-10 md:w-10 p-px hover:bg-green-300 active:scale-90 transition duration-75'}
      onClick={restorePiece}
      src={pic}
      alt={name}
    />
  )
}