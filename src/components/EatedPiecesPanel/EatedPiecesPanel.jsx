import './eated-pieces-panel.css'
import { ChessContext } from '../../context/chessContext'
import { COLUMNS } from '../../Game Functions/auxiliar-functions'
import { useContext } from 'react'
import EatedPiece from './EatedPiece'


export default function EatedPiecesPanel() {
  const {
    currentBoard,
    currentEated,
    playerTurn
  } = useContext(ChessContext)


  const coordOfPawn = currentBoard.findIndex((piece, coord) => {
    const contrary = {
      'W': 'B_PAWN',
      'B': 'W_PAWN'
    }

    const contraryPawn = contrary[playerTurn]
    const isPawn = piece?.name.includes(contraryPawn)

    const atEdge = COLUMNS.some(column => {
      const atTop = Math.min(...column) === coord
      const atBottom = Math.max(...column) === coord
      return atTop || atBottom
    })

    return isPawn && atEdge
  })


  const PlayerEatedPieces = ({ player }) => {
    const eatedPieces = currentEated.filter(piece => {
      return piece?.name.startsWith(player)
    })

    const hasEatedPieces = eatedPieces.length !== 0
    const isContraryTurn = playerTurn !== player
    const isPawnAtBorder = coordOfPawn !== -1


    const className = hasEatedPieces && isContraryTurn && isPawnAtBorder
      ? 'eated-player'
      : 'eated-player blocked'


    return (
      <div className={className}>
        {eatedPieces.map(piece => {
          return (
            <EatedPiece
              pic={piece.pic}
              name={piece.name}
              key={piece.name}
              coordOfPawn={coordOfPawn}
            />
          )
        })}
      </div>
    )
  }


  return (
    <section className='eated-pieces-panel'>
      <PlayerEatedPieces player='B' />
      <PlayerEatedPieces player='W' />
    </section>

  )
}