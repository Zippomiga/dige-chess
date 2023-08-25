import './normalize.css'
import './app.css'
import ChessBoard from './components/ChessBoard/ChessBoard'
import PlayerTurn from './components/PlayerShifts/PlayerTurn'
import EatedPieces from './components/EatedPieces/EatedPieces'

export default function App() {
  return (
    <main>
      <EatedPieces />
      <ChessBoard />
      <PlayerTurn />
    </main>
  )
}