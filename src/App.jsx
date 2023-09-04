import './normalize.css'
import './app.css'
import ChessBoard from './components/ChessBoard/ChessBoard'
import PlayerTurn from './components/PlayerShifts/PlayerTurn'
import EatedPiecesPanel from './components/EatedPieces/EatedPiecesPanel'

export default function App() {
  return (
    <main>
      <EatedPiecesPanel />
      <ChessBoard />
      <PlayerTurn />
    </main>
  )
}