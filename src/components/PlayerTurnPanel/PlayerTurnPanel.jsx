import { CHESS_BOARD } from '../../Game Functions/chessBoard'
import { ChessContext } from '../../context/chessContext'
import { useContext } from 'react'
import blackTurn from '../../assets/chess-pieces/b-shift.png'
import whiteTurn from '../../assets/chess-pieces/w-shift.png'
import resetButton from '../../assets/chess-pieces/reset.png'
import undoButton from '../../assets/chess-pieces/undo.png'


export default function PlayerTurnPanel() {
  const {
    setCurrentBoard,
    setCurrentEated,
    previousBoard,
    setPreviousBoard,
    previousEated,
    setPreviousEated,
    lastMovement,
    setLastMovement,
    setTurn,
    setCurrentMoves,
    setCurrentCoord,
    setCurrentSquare,
    playerTurn
  } = useContext(ChessContext)


  function restartChess() {
    setCurrentBoard(CHESS_BOARD)
    setCurrentEated([])
    setCurrentMoves([])
    setCurrentCoord(null)
    setCurrentSquare(null)
    setPreviousBoard([])
    setPreviousEated([])
    setLastMovement(false)
    setTurn(true)
  }


  function handleLastMove() {
    if (!lastMovement) { return }
    setLastMovement(false)
    setCurrentBoard(previousBoard)
    setCurrentEated(previousEated)
    setCurrentMoves([])
    setTurn(turn => !turn)
  }


  const PlayerTurn = ({ player, pic }) => (
    <img
      src={pic}
      className={`rounded-md bg-gray-200 w-12 h-12 p-px xs:w-16 xs:h-16 sm:p-1 sm:w-20 sm:h-20 ${playerTurn === player ? 'opacity-100' : 'opacity-20'}`}
      alt={player + ' turn'}
    />
  )


  const Button = ({ className, onClick, children }) => (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  )


  return (
    <section className={'flex justify-center items-center gap-12 sm:flex-col sm:w-fit'}>
      <PlayerTurn player='B' pic={blackTurn} />
      <Button
        className={`rounded-md bg-gray-200 text-slate-950 h-10 w-10 p-1 transition duration-75 hover:bg-slate-400 active:scale-95 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:p-2 ${lastMovement ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-20'}`}
        onClick={handleLastMove}
      >
        <img src={undoButton} alt="" />
      </Button>
      <Button
        className={'rounded-md bg-gray-200 text-slate-950 h-10 w-10 p-1 transition duration-75 hover:bg-red-300 active:scale-95 xs:w-14 xs:h-14 sm:w-16 sm:h-16 sm:p-2'}
        onClick={restartChess}
      >
        <img src={resetButton} alt="" />
      </Button>
      <PlayerTurn player='W' pic={whiteTurn} />
    </section>
  )
}