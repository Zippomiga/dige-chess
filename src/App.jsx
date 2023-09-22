import './normalize.css'
import './app.css'
import ChessBoard from './components/ChessBoard/ChessBoard'
import PlayerTurnPanel from './components/PlayerTurnPanel/PlayerTurnPanel'
import EatedPiecesPanel from './components/EatedPiecesPanel/EatedPiecesPanel'


export default function App() {
  return (
    <main className='min-h-screen flex justify-center items-center gap-8 bg-stone-900 select-none'>
      <EatedPiecesPanel />
      <ChessBoard />
      <PlayerTurnPanel />
    </main>
  )
}