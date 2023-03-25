import './chess-board.css'
import Square from '../Square/Square'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'

export default function ChessBoard() {
  const { chessBoard } = useContext(ChessContext)

  // console.log(chessBoard)

  return (
    <section className='chess-board'>
      {
        chessBoard.map((square, index) => {
          return (
            <Square
              key={index}
              piece={square}
              currentPosition={index}
            />
          )
        })
      }
    </section>
  )
}