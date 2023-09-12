import './normalize.css'
import './app.css'
import ChessBoard from './components/ChessBoard/ChessBoard'
import PlayerTurnPanel from './components/PlayerTurn/PlayerTurnPanel'
import EatedPiecesPanel from './components/EatedPieces/EatedPiecesPanel'


export default function App() {
  return (
    <main>
      <EatedPiecesPanel />
      <ChessBoard />
      <PlayerTurnPanel />
    </main>
  )
}