import './chess-board.css'
import Square from '../Square/Square'
import { useContext, useEffect } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function ChessBoard() {
  const {
    currentBoard,
    turn,
    current,
    contrary,
    updateBoard,
    isSamePlayer,
    playerPieces,
    playerMoves,
    currentKing,
    isCheck
  } = useContext(ChessContext)

  

  const isCheckMate = () => {
    if (!isCheck()) { return }

    const CURRENT_PIECES = playerPieces(current)
    const CURRENT_MOVES = playerMoves(current)

    for (let i = 0; i < CURRENT_PIECES.length; i++) {
      const currentPiece = CURRENT_PIECES[i]
      const currentMoves = CURRENT_MOVES[i]
      const currentCoord = currentBoard.indexOf(currentPiece)

      for (let j = 0; j < currentMoves.length; j++) {
        const newCoord = currentMoves[j]
        const newSquare = currentBoard[newCoord]
        if (isSamePlayer(newSquare)) { continue }

        const newBoard = updateBoard(currentCoord, newCoord, currentPiece)
        const newCurrentKing = currentKing(newBoard)
        const newContraryMoves = playerMoves(contrary, newBoard)
        const NOT_CHECK_MATE = !isCheck(newCurrentKing, newContraryMoves)

        if (NOT_CHECK_MATE) { return false }
      }
    }
    console.log('CHECK MATE');
    return true
  }


  useEffect(() => {
    isCheckMate()
  }, [turn])


  return (
    <section className='chess-board'>
      {currentBoard.map((square, coord) => {
        return (
          <Square
            key={square?.name ?? coord}
            square={square}
            coord={coord}
          />
        )
      })}
    </section>
  )
}