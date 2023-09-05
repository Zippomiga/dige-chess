import './eated-piece.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { CHESS_BOARD } from '../../Game Functions/board'

export default function EatedPiece({ pic, name }) {
  const {
    currentEated,
    currentSquare,
    // newCoord,
    updateBoard,
    currentBoard,
    setCurrentBoard,
    playerCanRecover
  } = useContext(ChessContext)


  function recoverPiece(e) {
    const id = e.target.id
    const recoveredPiece = CHESS_BOARD.find(piece => piece?.name === id)
    const { can, newCoord } = playerCanRecover()

    // console.log({can, newCoord, recoveredPiece});
  }

  return (
    <img
      onClick={recoverPiece}
      className='eated-piece'
      src={pic}
      alt={name}
      id={name}
    />
  )
}