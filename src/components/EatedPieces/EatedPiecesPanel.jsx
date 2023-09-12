import { CHESS_BOARD } from '../../Game Functions/chessBoard'
import './eated-pieces-panel.css'
import EatedPiece from './EatedPiece'
import { useEffect } from 'react'


export default function EatedPiecesPanel({
  currentBoard,
  currentCoord,
  setCurrentBoard,
  currentEated,
  setCurrentEated,
  setPreviousEated,
  previousBoard,
  lastMovement,
  setLastMovement,
  turn,
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


  function updateEatedPieces() {
    const previousSquare = previousBoard[currentCoord]
    const isEmpty = previousSquare === null
    const isPawn = previousSquare?.name.includes('PAWN') // pawns can not be restored
    const isPrevious = lastMovement === false

    if (isEmpty || isPawn || isPrevious) { return }

    setCurrentEated(currentEated => [...currentEated, previousSquare])
  }


  const PlayerEatedPieces = ({ player }) => {
    const eatedPieces = currentEated.filter(piece => {
      return piece?.name.startsWith(player)
    })

    const hasEatedPieces = eatedPieces.length !== 0
    const isContraryTurn = playerTurn !== player
    const isPawnAtBorder = pawnCoord !== -1


    function restorePiece(e) {
      if (!isPawnAtBorder) { return }

      const pieceName = e.target.alt
      const pieceToRestore = CHESS_BOARD.find(piece => piece?.name === pieceName)

      setCurrentBoard(currentBoard => {
        return [...currentBoard]
          .fill(pieceToRestore, pawnCoord, pawnCoord + 1)
      })

      setCurrentEated(currentEated => {
        return [...currentEated]
          .filter(eatedPiece => eatedPiece.name !== pieceName)
      })

      setLastMovement(true)
    }


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
              restorePiece={restorePiece}
            />
          )
        })}
      </div>
    )
  }


  useEffect(() => {
    updateEatedPieces()
    setPreviousEated(currentEated)
  }, [turn])


  return (
    <section className='eated-pieces-panel'>
      <PlayerEatedPieces player='B' />
      <PlayerEatedPieces player='W' />
    </section>

  )
}