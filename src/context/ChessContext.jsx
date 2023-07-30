import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [board, setBoard] = useState(CHESS_BOARD)
  const [squares, setSquares] = useState([])
  const [positions, setPositions] = useState([])
  const [moves, setMoves] = useState([])
  const [check, setCheck] = useState({})
  const [turn, setTurn] = useState(true)
  const [prevChess, setPrevChess] = useState({})
  const [threatenings, setThreatenings] = useState([])

  const [PIECE_1, PIECE_2] = squares
  const [POS_1, POS_2] = positions
  const PLAYER = turn ? 'W' : 'B'

  const getMovements = (selectedPiece, selectedPosition) => {
    const filledSquares = board.map((piece, position) => {
      return piece && position
    })

    return selectedPiece?.getMoves(selectedPosition, filledSquares)
  }

  function updateBoard() {
    const NEW_BOARD = [...board]

    NEW_BOARD[POS_1] = null
    NEW_BOARD[POS_2] = PIECE_1

    setBoard(NEW_BOARD)
  }

  function updateCheck() {
    const CONTRARY_KING = board.find(king => {
      const contrary = {
        'W': 'B_KING',
        'B': 'W_KING'
      }
      return king?.name === contrary[PLAYER]
    })
    const KING_POSITION = board.indexOf(CONTRARY_KING)
    const THREATENING_MOVES = getMovements(PIECE_1, POS_2)
    const IS_CHECK = THREATENING_MOVES?.includes(KING_POSITION)

    setCheck({
      CONTRARY_KING,
      KING_POSITION,
      THREATENING: PIECE_1,
      THREATENING_MOVES,
      LAST_POSITION: POS_2,
      IS_CHECK
    })
  }

  function resetChess() {
    setSquares([])
    setPositions([])
    setMoves([])
  }

  function updateChess() {
    updateBoard()
    updateCheck()
    resetChess()
    setTurn(turn => !turn)

    setPrevChess({
      board,
      squares,
      positions,
      moves,
      check,
      turn
    })
  }

  function colorizeMoves() {
    const PIECE_MOVES = getMovements(PIECE_1, POS_1)

    const COLORIZED = PIECE_MOVES?.filter(move => {
      const piece = board[move]
      return !piece?.name.startsWith(PLAYER)
    })

    setMoves([...COLORIZED, POS_1])
  }

  const isStillInCheck = () => {
    const { CONTRARY_KING, LAST_POSITION, THREATENING } = prevChess.check || {}
    const INDEX_KING = board.indexOf(CONTRARY_KING)
    const KEEP_THREATENING = getMovements(THREATENING, LAST_POSITION)
    
    console.log({INDEX_KING})
    return KEEP_THREATENING?.includes(INDEX_KING)
  }

  useEffect(() => {
    if (squares.length === 1) { // player has clicked once
      colorizeMoves()
    }

    if (squares.length === 2) { // player has clicked twice
      const invalidMove = !moves?.includes(POS_2)
      const samePlayer = PIECE_1?.name[0] === PIECE_2?.name[0]

      if (invalidMove || samePlayer) {
        resetChess()
      } else {
        updateChess()
      }
    }
  }, [squares])


  useEffect(() => {
    console.log('CURRENT')
    console.log({board})
    console.log({squares})
    console.log({positions})
    console.log({moves})
    console.log({check})
    console.log({turn})

    console.log('PREVIOUS')
    console.log(prevChess)

    if (isStillInCheck()) {
      console.log('SIGUE')
      setBoard(prevChess.board)
      setCheck(prevChess.check)
      setTurn(prevChess.turn)
    } else {
      console.log('NO SIGUE')
    }
  }, [check])


  return (
    <ChessContext.Provider value={{
      board,
      setBoard,
      squares,
      setSquares,
      positions,
      setPositions,
      moves,
      setMoves,
      check,
      setCheck,
      turn,
      setTurn,
      PLAYER
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}