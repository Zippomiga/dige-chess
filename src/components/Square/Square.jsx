import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { clickedTwice, fillSquare, filterCoords, invalidMove, invalidPiece, isIn } from '../../Game Functions/auxiliar-functions'


export default function Square({ sqrPiece, currPosit, filledSquares }) {
  const {
    chessBoard,
    setChessBoard,
    setTurn,
    pieces,
    playerTurn,
    setMoves,
    moves,
    setCheck
  } = useContext(ChessContext)

  function reset(piece, log) {
    pieces.current = []
    piece?.resetPositions()
    setMoves([])
    console.log(log)
  }
  
  function handleSquare() {
    pieces.current.push(sqrPiece)
    const [piece] = pieces.current
    
    if (invalidPiece(piece, playerTurn)) {
      reset(piece, `No piece in square || ${playerTurn} turn`)
      return
    }

    piece.setPositions(currPosit)
    piece.setCoords(setMoves, filledSquares, setCheck)
    
    const [oldPosit, newPosit] = piece.getPositions()

    if (clickedTwice(newPosit)) {
      if (invalidMove(piece, sqrPiece)) {
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