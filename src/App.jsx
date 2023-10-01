import './normalize.css'
import './app.css'
import ChessBoard from './components/ChessBoard/ChessBoard'
import PlayerTurnPanel from './components/PlayerTurnPanel/PlayerTurnPanel'
import EatedPiecesPanel from './components/EatedPiecesPanel/EatedPiecesPanel'


export default function App() {
  return (
    <main className='min-h-screen flex flex-col py-2 sm:flex-row justify-center items-center bg-neutral-900 select-none'>
      <EatedPiecesPanel />
      <ChessBoard />
      <PlayerTurnPanel />
    </main>
  )
}