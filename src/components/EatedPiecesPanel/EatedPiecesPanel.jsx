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
    const canRestore = hasEatedPieces && isContraryTurn && isPawnAtBorder


    return (
      <div className={'flex flex-col items-center justify-center flex-wrap-reverse gap-px w-[calc(9rem+2px)] h-[calc(15rem+6px)]' + ' ' + (canRestore ? 'pointer-events-auto' : 'pointer-events-none')}>
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
    <section className={'flex flex-col items-center justify-between gap-8'}>
      <PlayerEatedPieces player='B' />
      <PlayerEatedPieces player='W' />
    </section>

  )
}