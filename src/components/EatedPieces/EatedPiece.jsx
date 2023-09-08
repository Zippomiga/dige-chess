import './eated-piece.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { CHESS_BOARD } from '../../Game Functions/board'


export default function EatedPiece({ pic, name }) {
  const {
    setCurrentBoard,
    updateBoard,
    currentEated,
    setCurrentEated,
    setPreviousEated
  } = useContext(ChessContext)



  function recoverPiece(e) {
    const pieceName = e.target.id
    const recoveredPiece = CHESS_BOARD.find(piece => piece?.name === pieceName)
    // const newBoard = updateBoard('coord', 'coord', recoverPiece)

    // setCurrentBoard(newBoard)
    setPreviousEated(currentEated)
    setCurrentEated(currentEated => {
      const newCurrentEated = [...currentEated]
      return newCurrentEated.filter(eatedPiece => eatedPiece.name !== pieceName)
    })
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