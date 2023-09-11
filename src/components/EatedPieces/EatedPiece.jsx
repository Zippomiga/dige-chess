import './eated-piece.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { CHESS_BOARD } from '../../Game Functions/board'


export default function EatedPiece({ pic, name, pawnCoord }) {
  const {
    setCurrentBoard,
    setLastMovement,
    isSamePlayer,
    setCurrentEated,
  } = useContext(ChessContext)



  function restorePiece(e) {
    const pieceName = e.target.alt
    const pieceToRestore = CHESS_BOARD.find(piece => piece?.name === pieceName)
    const notContrary = isSamePlayer(pieceToRestore)
    
    if (notContrary) { return }

    setCurrentBoard(currentBoard => {
      return [...currentBoard]
        .fill(pieceToRestore, pawnCoord, pawnCoord + 1)
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