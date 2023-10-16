import blackCheckMate from '../../assets/chess-pieces/b_checkmate.png'
import whiteCheckMate from '../../assets/chess-pieces/w_checkmate.png'
import blackTurn from '../../assets/chess-pieces/b-shift.png'
import whiteTurn from '../../assets/chess-pieces/w-shift.png'
import { useContext } from 'react'
import { ChessContext } from '../../context/chessContext'


export default function CheckMateScreen() {
  const { playerTurn } = useContext(ChessContext)

  const isWhite = playerTurn === 'W'
  const checkMateScreenPic = isWhite ? whiteCheckMate : blackCheckMate
  const checkMatePlayerPic = isWhite ? blackTurn : whiteTurn
  const checkMateTeamWins = isWhite ? 'Black Team Wins' : 'White Team Wins'


  const Span = ({ className, children }) => (
    <span className={className}>
      {children}
    </span>
  )


  const Picture = ({ className, pic }) => (
    <img className={className} src={pic} alt="" />
  )


  return (
    <section className={'w-full h-full grid items-center justify-center absolute bg-gray-300 bg-opacity-90'}>
      <Span className={'rounded-md bg-teal-950 text-white p-2 text-center text-xl md:p-4 md:text-3xl'}>
        👑 CHECK MATE 👑
      </Span>
      <Picture
        className={'m-auto h-40 w-40 sm:h-60 sm:w-60 md:h-72 md:w-72'}
        pic={checkMateScreenPic}
      />
      <div className={'flex items-center rounded-md bg-teal-950 text-white p-2 text-center text-lg md:p-4 md:text-2xl'}>
        <Picture
          className={'rounded-md bg-gray-200 h-8 w-8 p-px md:h-10 md:w-10'}
          pic={checkMatePlayerPic}
        />
        <Span className='m-auto'>
          {checkMateTeamWins}
        </Span>
      </div>
    </section>
  )
}