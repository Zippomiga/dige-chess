import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { clickedTwice, fillSquare, filterCoords, isIn } from '../../Game Functions/auxiliar-functions'


export default function Square({ sqrPiece, currPosit, filledSquares }) {
  const {
    chessBoard,
    setChessBoard,
    setTurn,
    pieces,
    playerTurn,
    setMoves,
    moves
  } = useContext(ChessContext)

  // console.log(currPosit);

  function reset(piece, log) {
    pieces.current = []
    piece?.resetPositions()
    setMoves([])
    console.log(log)
  }


  function handleSquare() {
    pieces.current.push(sqrPiece)
    const [piece] = pieces.current

    if (
      piece === null ||                   // empty square ?
      !piece.name.startsWith(playerTurn)  // other player's turn ?
    ) {
      reset(piece, `No piece in square || ${playerTurn} turn`)
      return
    }

    piece.setPositions(currPosit)
    piece.setCoords(setMoves, filledSquares)

    const [oldPosit, newPosit] = piece.getPositions()

    if (clickedTwice(newPosit)) { // the player clicked twice
      if (
        piece.illegalMove() ||
        piece.name[0] === sqrPiece?.name[0] // same player ?
      ) {
        reset(piece, 'Ilegal move || Same player')
      } else {
        const oldBoard = fillSquare(chessBoard, null, oldPosit)
        const newBoard = fillSquare(oldBoard, piece, newPosit)

        setTurn(turn => !turn)
        setChessBoard(newBoard)
        reset(piece, 'Allowed')
      }
    }
  }

  const legalCoords = filterCoords(moves, chessBoard, playerTurn)

  return (
    <div
      className={isIn(legalCoords, currPosit) ? 'square move' : 'square'}
      id={currPosit}
      onClick={handleSquare}
    >
      <img
        className={isIn(sqrPiece?.name, 'PAWN') ? 'pawn  ' : 'piece'}
        src={sqrPiece?.pic}
        alt={sqrPiece?.name}
      />
      <span className='square-index'>
        {currPosit}
      </span>
    </div>
  )
}