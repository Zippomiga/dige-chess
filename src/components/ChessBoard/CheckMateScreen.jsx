import blackCheckMate from '../../assets/chess-pieces/b_checkmate2.png'
import whiteCheckMate from '../../assets/chess-pieces/w_checkmate2.png'
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
    <section className={'w-full h-full rounded-md grid items-center justify-center absolute bg-gray-200 bg-opacity-90'}>
      <Span className={'rounded-md bg-teal-950 text-white p-4 text-center text-4xl'}>
        👑 CHECK MATE 👑
      </Span>
      <Picture
        className={'h-72 w-72 m-auto'}
        pic={checkMateScreenPic}
      />
      <div className={'flex items-center rounded-md bg-teal-950 text-white p-4 text-center text-2xl'}>
        <Picture
          className={'rounded-full bg-gray-200 h-12 w-12 p-1'}
          pic={checkMatePlayerPic}
        />
        <Span className='m-auto'>
          {checkMateTeamWins}
        </Span>
      </div>
    </section>
  )
}