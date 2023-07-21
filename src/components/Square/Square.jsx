import './square.css'
import { useContext, useEffect } from 'react'
import { ChessContext } from '../../context/ChessContext'
// import { colorizeMoves, invalidMove, invalidPiece } from '../../Game Functions/auxiliar-functions'


export default function Square({ currPiece, currPosit }) {
  const {
    setSelectedSquares,
    setPositions,
    colorizedMoves,
  } = useContext(ChessContext)

  function handleSquare() {
    setSelectedSquares(pieces => [...pieces, currPiece])
    setPositions(positions => [...positions, currPosit])
  }

  // function handleSquare() {
  //   pieces.current.push(currPiece)
  //   const SELECTED_PIECE = pieces.current[0] // this is used to keep the selected piece

  //   if (invalidPiece(SELECTED_PIECE, playerTurn)) {
  //     reset(`No piece in square || ${playerTurn} turn`)
  //     return
  //   }

  //   SELECTED_PIECE.setPositions(currPosit)
  //   SELECTED_PIECE.setCoords(setMoves, filledSquares)

  //   const [oldPosit, newPosit] = SELECTED_PIECE.getPositions()

  //   if (pieces.current.length === 2) { // this means that the player has clicked twice
  //     if (invalidMove(SELECTED_PIECE, currPiece)) {
  //       SELECTED_PIECE.resetPositions()
  //       reset('Illegal move || Same player')
  //     } else {
  //       setChessBoard(board => {
  //         const newBoard = [...board]
  //         newBoard[oldPosit] = null
  //         newBoard[newPosit] = SELECTED_PIECE

  //         return newBoard
  //       })
  //       setThreatening(SELECTED_PIECE)
  //       setTurn(turn => !turn)
  //       reset('Allowed')
  //     }
  //   }
  // }


  return (
    <div
      className={colorizedMoves?.includes(currPosit) ? 'square move' : 'square'}
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