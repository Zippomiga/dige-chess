import './normalize.css'
import './app.css'
import ChessBoard from './components/ChessBoard/ChessBoard'
import PlayerTurnPanel from './components/PlayerTurnPanel/PlayerTurnPanel'
import EatedPiecesPanel from './components/EatedPiecesPanel/EatedPiecesPanel'


export default function App() {
  return (
    <main className='min-h-screen flex flex-col md:flex-row justify-center items-center gap-x-4 bg-neutral-950 select-none'>
      <EatedPiecesPanel />
      <ChessBoard />
      <PlayerTurnPanel />
    </main>
  )
}