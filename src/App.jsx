import './normalize.css'
import './app.css'
import ChessBoard from './components/ChessBoard/ChessBoard'
import PlayerTurn from './components/PlayerShifts/PlayerTurn'


export default function App() {
  return (
    <main>
      <ChessBoard />
      <PlayerTurn />
    </main>
  )
}