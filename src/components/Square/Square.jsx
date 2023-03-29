import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { fillSquare } from '../../Game Functions/auxiliar-functions'


export default function Square({ piece, currentPosition }) {
  const {
    chessBoard,
    setChessBoard,
    setTurn,
    pieces
  } = useContext(ChessContext)



  function handleSquare() {
    pieces.current.push(piece)
    const [currentPiece, newPiece] = pieces.current

    if (currentPiece === null) {
      pieces.current = []
      console.log('NOPE')
      return
    }

    currentPiece.setMoves(currentPosition)

    if (pieces.current.length === 2) { // has it been clicked twice ?
      const [oldPosit, newPosit] = currentPiece.getMoves()

      if (oldPosit === newPosit) {
        pieces.current = []
        currentPiece.resetMoves()
      } else {
        currentPiece.setNewCoords()

        const oldBoard = fillSquare(chessBoard, null, oldPosit)
        const newBoard = fillSquare(oldBoard, currentPiece, newPosit)

        setTurn(turn => !turn)
        setChessBoard(newBoard)
        pieces.current = []
      }
    }
  }


  return (
    <div
      className='square'
      id={currentPosition}
      onClick={handleSquare}
    >
      {piece?.name.includes('KI') &&
        <img
          className={piece?.name.includes('PAWN') ? 'pawn' : 'piece'}
          src={piece?.pic}
          alt={piece?.name}
        />}
      <span className='square-index'>
        {currentPosition}
      </span>
    </div>
  )
}