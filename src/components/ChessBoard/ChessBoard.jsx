import './chess-board.css'
import Square from '../Square/Square'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function ChessBoard() {
  const { currentBoard } = useContext(ChessContext)

  return (
    <section className='chess-board'>
      {currentBoard.map((square, coord) => {
        return (
          <Square
            key={coord}
            square={square}
            coord={coord}
          />
        )
      })}
    </section>
  )
}