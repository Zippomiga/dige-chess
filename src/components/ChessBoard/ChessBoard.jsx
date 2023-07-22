import './chess-board.css'
import Square from '../Square/Square'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function ChessBoard() {
  const { chess: { board } } = useContext(ChessContext)

  return (
    <section className='chess-board'>
      {
        board.map((square, index) => {
          return (
            <Square
              key={index}
              currPiece={square}
              currPosit={index}
            />
          )
        })
      }
    </section>
  )
}