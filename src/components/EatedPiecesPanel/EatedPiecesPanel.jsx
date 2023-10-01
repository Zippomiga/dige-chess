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
      return piece?.name.startsWith(player) && !piece?.name.includes("KING")
    })

    const hasEatedPieces = eatedPieces.length !== 0
    const isContraryTurn = playerTurn !== player
    const isPawnAtBorder = coordOfPawn !== -1
    const canRestore = hasEatedPieces && isContraryTurn && isPawnAtBorder

    return (
      <div className={`flex felx-col items-center justify-center flex-wrap-reverse gap-px w-[calc(9rem+5px)] h-[calc(4.5rem+2px)] xs:w-[calc(12rem+7px)] xs:h-[calc(3rem+1px)] sm:w-[calc(6rem+2px)] sm:h-[calc(10rem+4px)] md:w-[calc(7.5rem+2px)] md:h-[calc(12.5rem+4px)] ${canRestore ? 'pointer-events-auto' : 'pointer-events-none'}`}>
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
    <section className={'rounded-tr-md rounded-tl-md sm:rounded-bl-md sm:rounded-br-none sm:rounded-tr-none bg-teal-950 p-1 md:p-2 flex flex-row sm:flex-col items-center justify-between gap-4 xs:gap-4 sm:gap-3 md:gap-8'}>
      <PlayerEatedPieces player='B' />
      <PlayerEatedPieces player='W' />
    </section>

  )
}