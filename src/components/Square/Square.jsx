import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import { fillSquare } from '../../Game Functions/auxiliar-functions'


export default function Square({ piece, currPosit, filledSquares }) {
  const {
    chessBoard,
    setChessBoard,
    setTurn,
    pieces
  } = useContext(ChessContext)


  function reset(piece, log) {
    pieces.current = []
    piece?.resetPositions()
    console.log(log)
  }


  function handleSquare() {
    pieces.current.push(piece)
    const [currentPiece, newPiece] = pieces.current

    if (currentPiece === null) {
      reset(currentPiece, 'No piece in square')
      return
    }

    currentPiece.setPositions(currPosit)
    currentPiece.setCoords(filledSquares)

    const [oldPosit, newPosit] = currentPiece.getPositions()

    const sameSquare = oldPosit === newPosit
    const samePlayer = currentPiece?.name[0] === newPiece?.name[0]
    const outOfCoords = !currentPiece.isInCoords()

    if (oldPosit && newPosit) { //if both !== null, it means it has been clicked twice
      if (
        sameSquare ||
        samePlayer ||
        outOfCoords
      ) {
        reset(currentPiece, 'Same square || Same player piece || Out of coords')
        return // this disallows to the piece to eat another
      } else {
        const oldBoard = fillSquare(chessBoard, null, oldPosit)
        const newBoard = fillSquare(oldBoard, currentPiece, newPosit)

        setTurn(turn => !turn)
        setChessBoard(newBoard)
        reset(currentPiece, 'Allowed')
      }
    }
  }


  return (
    <div
      className='square'
      id={currPosit}
      onClick={handleSquare}
    >
      {piece?.name.includes('') &&
        <img
          className={piece?.name.includes('PAWN') ? 'pawn' : 'piece'}
          src={piece?.pic}
          alt={piece?.name}
        />}
      <span className='square-index'>
        {currPosit}
      </span>
    </div>
  )
}