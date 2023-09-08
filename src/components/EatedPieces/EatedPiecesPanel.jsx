import './eated-pieces-panel.css'
import { useContext } from 'react'
import { ChessContext } from '../../context/ChessContext'
import EatedPiece from './EatedPiece'


export default function EatedPiecesPanel() {
  const { currentEated } = useContext(ChessContext)


  
  const eatedPieces = player => {
    const playerPieces = currentEated.filter(piece => {
      return piece.name.startsWith(player)
    })


    return (
      <div className='eated-player'>
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