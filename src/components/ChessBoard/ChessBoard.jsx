import './chess-board.css'
import Square from '../Square/Square'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function ChessBoard() {
  const { chessBoard } = useContext(ChessContext)

  const filledSquares = chessBoard
    .map((piece, pos) => piece && pos)

  return (
    <section className='chess-board'>
      {
        chessBoard.map((square, index) => {
          return (
            <Square
              key={index}
              sqrPiece={square}
              currPosit={index}
              filledSquares={filledSquares}
            />
          )
        })
      }
    </section>
  )
}