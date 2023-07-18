import './square.css'
import { useContext, useEffect } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { colorizeMoves, invalidMove, invalidPiece } from '../../Game Functions/auxiliar-functions'


export default function Square({ currPiece, currPosit }) {
  const {
    chessBoard,
    setChessBoard,
    setTurn,
    pieces,
    playerTurn,
    setMoves,
    moves,
    setThreatening,
    filledSquares
  } = useContext(ChessContext)

  function reset(warning, piece = null) {
    pieces.current = []
    piece?.resetPositions()
    console.log(warning)
  }

  function handleSquare() {
    pieces.current.push(currPiece) // this is used to keep the selected piece
    const SELECTED_PIECE = pieces.current[0]

    if (invalidPiece(SELECTED_PIECE, playerTurn)) {
      reset(`No piece in square || ${playerTurn} turn`)
      return
    }

    SELECTED_PIECE.setPositions(currPosit)
    SELECTED_PIECE.setCoords(setMoves, filledSquares)

    const [oldPosit, newPosit] = SELECTED_PIECE.getPositions()

    if (pieces.current.length === 2) { // this means that the player has clicked twice
      if (invalidMove(SELECTED_PIECE, currPiece)) {
        reset('Illegal move || Same player', SELECTED_PIECE)
      } else {
        setChessBoard(board => {
          const NEW_BOARD = [...board]
          NEW_BOARD[oldPosit] = null
          NEW_BOARD[newPosit] = SELECTED_PIECE

          return NEW_BOARD
        })
        setThreatening(SELECTED_PIECE)
        setTurn(turn => !turn)
        reset('Allowed')
      }
    }
  }

  const colorized = colorizeMoves(moves, chessBoard, playerTurn, pieces.current)

  return (
    <div
      className={colorized?.includes(currPosit) ? 'square move' : 'square'}
      id={currPosit}
      onClick={handleSquare}
    >
      <img
        className={currPiece?.name.includes('PAWN') ? 'pawn  ' : 'piece'}
        src={currPiece?.pic}
        alt={currPiece?.name}
      />
      <span className='square-index'>
        {currPosit}
      </span>
    </div>
  )
}