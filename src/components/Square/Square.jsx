import './square.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function Square({ currPiece, currPosit }) {
  const { chess, setChess, PLAYER } = useContext(ChessContext)

  const isPawn = currPiece?.name.includes('PAWN') ? 'pawn  ' : 'piece'

  const squareColor = () => {
    const { CONTRARY_KING, IS_CHECK } = chess.check
    const isKing = IS_CHECK && CONTRARY_KING === currPosit
    const isMove = chess.moves?.includes(currPosit)
    
    return isKing ? 'square check' : isMove ? 'square move' : 'square'
  } 

  function handleSquare() {
    const startingMove = !chess.squares.length
    const invalidSquare = !currPiece
    const invalidPlayer = !currPiece?.name.startsWith(PLAYER)

    if (startingMove && (invalidSquare || invalidPlayer)) return

    setChess(chess => {
      return {
        ...chess,
        squares: [...chess.squares, currPiece],
        positions: [...chess.positions, currPosit]
      }
    })
  }

  return (
    <div
      className={squareColor()}
      id={currPosit}
      onClick={handleSquare}
    >
      <img
        className={isPawn}
        src={currPiece?.pic}
        alt={currPiece?.name}
      />
      <span className='square-index'>
        {currPosit}
      </span>
    </div>
  )
}