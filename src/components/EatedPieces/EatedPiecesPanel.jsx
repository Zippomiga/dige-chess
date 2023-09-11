import './eated-pieces-panel.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import EatedPiece from './EatedPiece'
import { COLUMNS } from '../../Game Functions/auxiliar-functions'


const edgeTop = COLUMNS.map(column => Math.min(...column))
const edgeBottom = COLUMNS.map(column => Math.max(...column))
const boardEdges = [...edgeTop, ...edgeBottom]


export default function EatedPiecesPanel() {
  const {
    currentEated,
    currentBoard,
    playerTurn,
    isSamePlayer
  } = useContext(ChessContext)



  const eatedPieces = player => {
    const pawnCoord = currentBoard.findIndex((piece, coord) => {
      const notContraryPawn = !isSamePlayer(piece)
      const isPawn = piece?.name.includes('PAWN')
      const inEdge = boardEdges.includes(coord)

      return notContraryPawn && isPawn && inEdge
    })


    const playerPieces = currentEated.filter(piece => {
      const playerPiece = piece.name.startsWith(player)
      const isNotPawn = !piece.name.includes('PAWN') // panws can not be restored
  
      return playerPiece && isNotPawn
    })


    const isPawnAtBorder = pawnCoord !== -1
    const hasEatedPieces = playerPieces.length !== 0
    const isContraryTurn = playerTurn !== player


    return (
      <div className={
        isPawnAtBorder && hasEatedPieces && isContraryTurn
          ? 'eated-player restore'
          : 'eated-player'
      }>
        {playerPieces.map(piece => {
          return (
            <EatedPiece
              pic={piece.pic}
              name={piece.name}
              pawnCoord={pawnCoord}
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