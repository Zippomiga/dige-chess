import './eated-pieces-panel.css'
import { useContext, useLayoutEffect, useState } from 'react'
import { ChessContext } from '../../context/ChessContext'
import EatedPiece from './EatedPiece'
import { BORDER_ROWS } from '../../Game Functions/auxiliar-functions'


export default function EatedPiecesPanel() {
  const {
    currentEated,
    currentBoard,
    turn,
    playerTurn,
    isSamePlayer
  } = useContext(ChessContext)

  const [canRestore, setCanRestore] = useState(false)



  useLayoutEffect(() => {
    const x = currentBoard.findIndex((piece, coord) => {
      const inEdge = BORDER_ROWS.includes(coord)
      const isPawn = piece?.name.includes('PAWN')
      return !isSamePlayer(piece) && inEdge && isPawn
    })

    const canRestorePiece = x !== -1
    setCanRestore(canRestorePiece)
  }, [turn])



  const eatedPieces = player => {
    const playerPieces = currentEated.filter(piece => {
      return piece.name.startsWith(player)
    })

    const contraryTurn = playerTurn !== player

    return (
      <div className={
        contraryTurn && canRestore
          ? 'eated-player restore'
          : 'eated-player'
      }>
        {playerPieces.map(piece => {
          return (
            <EatedPiece
              pic={piece.pic}
              name={piece.name}
              key={piece.name}
            />
          )
        })}
      </div>
    )
  }



  return (
    <section className='eated-pieces'>
      {eatedPieces('B')}
      {eatedPieces('W')}
    </section>

  )
}