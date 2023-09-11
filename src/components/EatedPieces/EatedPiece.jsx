import './eated-piece.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { getCoordToReplace, getPieceToReplace } from '../../Game Functions/auxiliar-functions'


export default function EatedPiece({ pic, name }) {
  const {
    setCurrentBoard,
    setLastMovement,
    currentBoard,
    isSamePlayer,
    setCurrentEated,
  } = useContext(ChessContext)



  function restorePiece(e) {
    const pieceName = e.target.alt
    const pieceToReplace = getPieceToReplace(pieceName)
    const coordToReplace = getCoordToReplace(currentBoard)

    const notContrary = isSamePlayer(pieceToReplace)
    const notPawnAtEdge = coordToReplace === -1

    if (notContrary || notPawnAtEdge) { return }

    setCurrentBoard(currentBoard => {
      return [...currentBoard]
        .fill(pieceToReplace, coordToReplace, coordToReplace + 1)
    })

    setCurrentEated(currentEated => {
      return [...currentEated]
        .filter(eatedPiece => eatedPiece.name !== pieceName)
    })

    setLastMovement(true)
  }



  return (
    <img
      onClick={restorePiece}
      className={
        name.includes('PAWN')
          ? 'eated-pawn'
          : 'eated-piece'
      }
      src={pic}
      alt={name}
    />
  )
}