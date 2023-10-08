import './square.css'
import { ChessContext } from '../../context/chessContext'
import { useContext } from 'react'
import { validCoord } from '../../Game Functions/auxiliar-functions'
import Square from './Square'
import CheckMateScreen from './CheckMateScreen'


export default function ChessBoard() {
  const {
    currentBoard,
    setCurrentBoard,
    currentEated,
    setPreviousBoard,
    setPreviousEated,
    setLastMovement,
    setTurn,
    currentMoves,
    setCurrentMoves,
    currentCoord,
    setCurrentCoord,
    currentSquare,
    setCurrentSquare,
    playerTurn
  } = useContext(ChessContext)


  const current = 'currentPlayer'
  const contrary = 'contraryPlayer'


  const isSamePlayer = square => {
    return square?.name.startsWith(playerTurn)
  }


  const getMovements = (piece, coord, board = currentBoard) => {
    return piece
      ?.getMoves(coord, board)
      .filter(validCoord)
  }


  const playerPieces = (player, board = currentBoard) => {
    return board.filter(piece => {
      switch (player) {
        case 'currentPlayer':
          return piece !== null && isSamePlayer(piece)
        case 'contraryPlayer':
          return piece !== null && !isSamePlayer(piece)
      }
    })
  }


  const playerMoves = (player, board = currentBoard) => {
    const pieces = playerPieces(player, board)
    return pieces.map(piece => {
      const currentCoord = board.indexOf(piece)
      return getMovements(piece, currentCoord, board)
    })
  }


  const updateBoard = (oldCoord, newCoord, newPiece) => {
    const newBoard = [...currentBoard]

    newBoard[oldCoord] = null
    newBoard[newCoord] = newPiece

    return newBoard
  }


  const currentKing = (board = currentBoard) => {
    return board.findIndex(king => {
      const kingName = playerTurn + '_KING'
      return king?.name === kingName
    })
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


  function updateChess(coord) {
    const newBoard = updateBoard(currentCoord, coord, currentSquare)

    setCurrentBoard(newBoard)
    setCurrentMoves([])
    setPreviousBoard(currentBoard)
    setPreviousEated(currentEated)
    setLastMovement(true)
    setTurn(turn => !turn)
  }


  return (
    <div className='relative'>
      {isCheckMate() && <CheckMateScreen />}
      <section className={'sm:rounded-md grid grid-cols-8 gap-px p-1 xs:px-4 sm:p-2'}>
        {currentBoard.map((square, coord) => {
          return (
            <Square
              square={square}
              coord={coord}
              key={square?.name ?? coord}
              currentMoves={currentMoves}
              isSamePlayer={isSamePlayer}
              currentKing={currentKing}
              isCheck={isCheck}
              updateCurrent={updateCurrent}
              updateChess={updateChess}
            />
          )
        })}
      </section>
    </div >
  )
}