import './chess-board.css'
import Square from '../Square/Square'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function ChessBoard() {
  const { board } = useContext(ChessContext)

  return (
    <section className='chess-board'>
      {
        board.map((square, position) => {
          return (
            <Square
              key={position}
              square={square}
              position={position}
            />
          )
        })
      }
    </section>
  )
}