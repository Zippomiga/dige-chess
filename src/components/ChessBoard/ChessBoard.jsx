import './chess-board.css'
import Square from '../Square/Square'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function ChessBoard() {
  const { chessBoard } = useContext(ChessContext)

  const filledSquares = chessBoard
    .map((piece, position) => piece ? position : null)
    .filter(pos => pos !== null)


  // console.log(filledSquares)

  return (
    <section className='chess-board'>
      {
        chessBoard.map((square, index) => {
          return (
            <Square
              key={index}
              piece={square}
              currPosit={index}
              filledSquares={filledSquares}
            />
          )
        })
      }
    </section>
  )
}