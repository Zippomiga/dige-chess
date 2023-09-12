import './chess-board.css'
import Square from '../Square/Square'
import { useEffect } from 'react'


export default function ChessBoard({
  currentBoard,
  setCurrentBoard,
  currentMoves,
  setCurrentMoves,
  currentCoord,
  setCurrentCoord,
  currentSquare,
  setCurrentSquare,
  setPreviousBoard,
  setLastMovement,
  setTurn,
  current,
  contrary,
  isSamePlayer,
  playerPieces,
  getMovements,
  playerMoves
}) {


  const updateBoard = (oldCoord, newCoord, newPiece) => {
    const newBoard = [...currentBoard]

    newBoard[oldCoord] = null
    newBoard[newCoord] = newPiece

    return newBoard
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

        if (NOT_CHECK_MATE) { return false }
      }
    }
    console.log('CHECK MATE');
    return true
  }


  function updateCurrent(square, coord) {
    const allMoves = getMovements(square, coord)

    const newMoves = allMoves.filter(move => {
      const newSquare = currentBoard[move]
      const newBoard = updateBoard(coord, move, square)
      const newCurrentKing = currentKing(newBoard)
      const newContraryMoves = playerMoves(contrary, newBoard)

      const samePlayer = isSamePlayer(newSquare)
      const leftInCheck = isCheck(newCurrentKing, newContraryMoves)

      return !samePlayer && !leftInCheck
    })

    const moves = newMoves.length === 0 ? [] : [...newMoves, coord]

    setCurrentMoves(moves)
    setCurrentCoord(coord)
    setCurrentSquare(square)
  }


  function updateChess(square, coord) {
    const newBoard = updateBoard(currentCoord, coord, currentSquare)
    setCurrentBoard(newBoard)
    setCurrentMoves([])
    setCurrentCoord(coord)
    setCurrentSquare(square)
    setPreviousBoard(currentBoard)
    setLastMovement(true)
    setTurn(turn => !turn)
  }


  useEffect(() => {
    isCheckMate()
  }, [isCheck()])


  return (
    <section className='chess-board'>
      {currentBoard.map((square, coord) => {
        return (
          <Square
            square={square}
            coord={coord}
            key={square?.name ?? coord}
            currentMoves={currentMoves}
            isSamePlayer={isSamePlayer}
            isCheck={isCheck}
            currentKing={currentKing}
            updateCurrent={updateCurrent}
            updateChess={updateChess}
          />
        )
      })}
    </section>
  )
}