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
    const eatedPieces = currentBoard.filter(piece => {
      return piece?.name.startsWith(player) && !piece?.name.includes('KING')
    })

    const hasEatedPieces = eatedPieces.length !== 0
    const isContraryTurn = playerTurn !== player
    const isPawnAtBorder = coordOfPawn !== -1
    const canRestore = hasEatedPieces && isContraryTurn && isPawnAtBorder

    return (
      <div className={`flex felx-col items-center justify-center flex-wrap-reverse gap-px w-[calc(7.5rem+4px)] h-[calc(4.5rem+2px)] xs:w-[calc(12rem+7px)] xs:h-[calc(3rem+1px)] ${canRestore ? 'pointer-events-auto' : 'pointer-events-none'}`}>
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
    <section className={'flex flex-row md:flex-col items-center justify-between gap-8 xs:gap-2'}>
      <PlayerEatedPieces player='B' />
      <PlayerEatedPieces player='W' />
    </section>

  )
}