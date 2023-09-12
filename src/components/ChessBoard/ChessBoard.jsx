import './chess-board.css'
import Square from '../Square/Square'
import { useContext, useEffect } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { validCoord } from '../../Game Functions/auxiliar-functions'


export default function ChessBoard() {
  const {
    currentBoard,
    isSamePlayer,
  } = useContext(ChessContext)


  const current = 'current'
  const contrary = 'contrary'


  const updateBoard = (oldCoord, newCoord, newPiece) => {
    const newBoard = [...currentBoard]

    newBoard[oldCoord] = null
    newBoard[newCoord] = newPiece

    return newBoard
  }



  const playerPieces = (player, board = currentBoard) => {
    return board.filter(piece => {
      switch (player) {
        case current:
          return piece !== null && isSamePlayer(piece)
        case contrary:
          return piece !== null && !isSamePlayer(piece)
      }
    })
  }



  const playerMoves = (player, board = currentBoard) => {
    const pieces = playerPieces(player, board)
    return pieces.map(piece => {
      const currentCoord = board.indexOf(piece)
      return piece
        .getMoves(currentCoord, board)
        .filter(validCoord)
    })
  }



  const currentKing = (board = currentBoard) => {
    const currentPieces = playerPieces(current, board)
    const currentKing = currentPieces.find(king => king.name.includes('KING'))
    return board.indexOf(currentKing)
  }



  const isCheck = (king = currentKing(), movements = playerMoves(contrary)) => {
    return movements.some(moves => moves.includes(king))
  }



  const isCheckMate = () => {
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

        if (NOT_CHECK_MATE) {
          console.log('NOT CHECK MATE');
          return false
        }
      }
    }
    console.log('CHECK MATE');
    return true
  }



  useEffect(() => {
    isCheckMate()
  }, [isCheck()])



  return (
    <section className='chess-board'>
      {currentBoard.map((square, coord) => {
        return (
          <Square
            key={square?.name ?? coord}
            square={square}
            coord={coord}
            contrary={contrary}
            updateBoard={updateBoard}
            playerMoves={playerMoves}
            currentKing={currentKing}
            isCheck={isCheck}
          />
        )
      })}
    </section>
  )
}