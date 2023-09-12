import './eated-pieces-panel.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import EatedPiece from './EatedPiece'


const boardBorders = [
  0, 1, 2, 3, 4, 5, 6, 7,
  56, 57, 58, 59, 60, 61, 62, 63
]


export default function EatedPiecesPanel() {
  const {
    currentBoard,
    currentEated,
    playerTurn,
    isSamePlayer
  } = useContext(ChessContext)



  const playerEatedPieces = player => {
    const eatedPieces = currentEated.filter(piece => {
      const playerPiece = piece.name.startsWith(player)
      const isNotPawn = !piece.name.includes('PAWN') // pawns can not be restored

      return playerPiece && isNotPawn
    })


    const pawnCoord = currentBoard.findIndex((piece, coord) => {
      const notContraryPawn = !isSamePlayer(piece)
      const isPawn = piece?.name.includes('PAWN')
      const inEdge = boardBorders.includes(coord)

      return notContraryPawn && isPawn && inEdge
    })


    const isPawnAtBorder = pawnCoord !== -1
    const hasEatedPieces = eatedPieces.length !== 0
    const isContraryTurn = playerTurn !== player


    return (
      <div className={
        isPawnAtBorder && hasEatedPieces && isContraryTurn
          ? 'eated-player restore'
          : 'eated-player'
      }>
        {eatedPieces.map(piece => {
          return (
            <EatedPiece
              pic={piece.pic}
              name={piece.name}
              pawnCoord={pawnCoord}
              isPawnAtBorder={isPawnAtBorder}
              key={piece.name}
            />
          )
        })}
      </div>
    )
  }



  return (
    <section className='eated-pieces-panel'>
      {playerEatedPieces('B')}
      {playerEatedPieces('W')}
    </section>

  )
}