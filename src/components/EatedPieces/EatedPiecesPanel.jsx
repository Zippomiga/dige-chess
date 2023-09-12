import './eated-pieces-panel.css'
import EatedPiece from './EatedPiece'


export default function EatedPiecesPanel({
  currentBoard,
  setCurrentBoard,
  currentEated,
  setCurrentEated,
  setLastMovement,
  playerTurn
}) {

  const boardBorders = [
    0, 1, 2, 3, 4, 5, 6, 7,         // BORDER TOP
    56, 57, 58, 59, 60, 61, 62, 63  // BORDER BOTTOM
  ]


  const contraryPawn = {
    'W': 'B_PAWN',
    'B': 'W_PAWN'
  }


  const pawnCoord = currentBoard.findIndex((piece, coord) => {
    const inEdge = boardBorders.includes(coord)
    const isPawn = piece?.name.includes(contraryPawn[playerTurn])

    return inEdge && isPawn
  })


  const playerEatedPieces = player => {
    const eatedPieces = currentEated.filter(piece => {
      return piece.name.startsWith(player)
    })

    const hasEatedPieces = eatedPieces.length !== 0
    const isContraryTurn = playerTurn !== player
    const isPawnAtBorder = pawnCoord !== -1

    return (
      <div className={
        hasEatedPieces && isContraryTurn && isPawnAtBorder
          ? 'eated-player'
          : 'eated-player blocked'
      }>
        {eatedPieces.map(piece => {
          return (
            <EatedPiece
              setCurrentBoard={setCurrentBoard}
              setCurrentEated={setCurrentEated}
              setLastMovement={setLastMovement}
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