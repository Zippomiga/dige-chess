import './eated-piece.css'
import { CHESS_BOARD } from '../../Game Functions/chessBoard'
import { ChessContext } from '../../context/chessContext'
import { useContext } from 'react'


export default function EatedPiece({ pic, name, isPawnAtBorder, coordOfPawn }) {
  const {
    setCurrentBoard,
    setCurrentEated,
    setLastMovement
  } = useContext(ChessContext)


  function restorePiece() {
    if (!isPawnAtBorder || name.includes('PAWN')) {
      return
    }

    const pieceToRestore = CHESS_BOARD
      .find(piece => piece?.name === name)

    setCurrentBoard(currentBoard => {
      return [...currentBoard]
        .fill(pieceToRestore, coordOfPawn, coordOfPawn + 1)
    })

    setCurrentEated(currentEated => {
      return [...currentEated]
        .filter(eatedPiece => eatedPiece.name !== name)
    })

    setLastMovement(true)
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