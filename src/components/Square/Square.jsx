import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { fillSquare, isIn } from '../../Game Functions/auxiliar-functions'


export default function Square({ sqrPiece, currPosit, filledSquares }) {
  const {
    chessBoard,
    setChessBoard,
    setTurn,
    pieces,
    playerTurn,
  } = useContext(ChessContext)


  function reset(currentPiece, log) {
    pieces.current = []
    currentPiece?.resetPositions()
    console.log(log)
  }


  function handleSquare() {
    pieces.current.push(sqrPiece)
    const [piece] = pieces.current

    if (
      piece === null ||             // empty square ?
      piece.name[0] !== playerTurn  // other player's turn ?
    ) {
      reset(piece, `No piece in square || ${playerTurn} turn`)
      return
    }

    piece.setPositions(currPosit)
    piece.setCoords(filledSquares)

    const [oldPosit, newPosit] = piece.getPositions()

    if (newPosit !== undefined) { // the player clicked twice
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


  return (
    <div
      className='square'
      id={currPosit}
      onClick={handleSquare}
    >
      <img
        className={sqrPiece?.name.includes('PAWN') ? 'pawn  ' : 'piece'}
        src={sqrPiece?.pic}
        alt={sqrPiece?.name}
      />
      <span className='square-index'>
        {currPosit}
      </span>
    </div>
  )
}