import './eated-piece.css'


export default function EatedPiece({ pic, name, restorePiece }) {
  return (
    <img
      className='eated-piece'
      onClick={restorePiece}
      src={pic}
      alt={name}
    />
  )
}