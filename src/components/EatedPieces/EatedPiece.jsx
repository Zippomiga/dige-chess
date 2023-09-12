import './eated-piece.css'
import { CHESS_BOARD } from '../../Game Functions/chessBoard'


export default function EatedPiece({
  setCurrentBoard,
  setCurrentEated,
  setLastMovement,
  pic,
  name,
  pawnCoord,
  isPawnAtBorder
}) {

  function restorePiece(e) {
    if (!isPawnAtBorder) { return }

    const pieceName = e.target.alt
    const pieceToRestore = CHESS_BOARD.find(piece => piece?.name === pieceName)

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
      className='eated-piece'
      src={pic}
      alt={name}
    />
  )
}