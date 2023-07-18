import './chess-board.css'
import Square from '../Square/Square'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function ChessBoard() {
  const { chessBoard, filledSquares } = useContext(ChessContext)

  return (
    <section className='chess-board'>
      {
        chessBoard.map((square, index) => {
          return (
            <Square
              key={index}
              currPiece={square}
              currPosit={index}
              filledSquares={filledSquares}
            />
          )
        })
      }
    </section>
  )
}