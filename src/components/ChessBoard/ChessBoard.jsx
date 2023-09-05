import './chess-board.css'
import Square from '../Square/Square'
import { useContext, useEffect } from 'react'
import { ChessContext } from '../../context/ChessContext'


export default function ChessBoard() {
  const {
    currentBoard,
    squares,
    updateChess,
    isCheckMate,
    isCheck
  } = useContext(ChessContext)


  useEffect(() => {
    if (squares.length === 2) { // player has clicked twice
      updateChess()
    }

    if (isCheck()) {
      console.log('THREATENED');
      isCheckMate()
    }
  }, [squares])


  return (
    <section className='chess-board'>
      {currentBoard.map((square, coord) => {
        return (
          <Square
            key={square?.name ?? coord}
            square={square}
            coord={coord}
          />
        )
      })}
    </section>
  )
}