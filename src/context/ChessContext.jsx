import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [board, setBoard] = useState(CHESS_BOARD)
  const [squares, setSquares] = useState([])
  const [positions, setPositions] = useState([])
  const [colorizedMoves, setColorizedMoves] = useState([])
  const [turn, setTurn] = useState(true)

  const [threatenings, setThreatenings] = useState({})
  const [kings, setKings] = useState({})
  const [check, setCheck] = useState({})

  const [PIECE_1, PIECE_2] = squares
  const [POSITION_1, POSITION_2] = positions
  const PLAYER = turn ? 'W' : 'B'

  const getMovements = (selectedPiece, selectedPosition) => {
    const filledSquares = board.map((filled, position) => {
      return filled && position
    })
    const MOVEMENTS = selectedPiece?.getMoves(selectedPosition, filledSquares)
    return MOVEMENTS.sort((a, b) => a - b)
  }

  function updateBoard() {
    const NEW_BOARD = [...board]
    NEW_BOARD[POSITION_1] = null
    NEW_BOARD[POSITION_2] = PIECE_1

    setBoard(NEW_BOARD)
  }

  function resetChess() {
    setSquares([])
    setPositions([])
    setColorizedMoves([])
  }

  function colorizeMoves() {
    const PIECE_MOVES = getMovements(PIECE_1, POSITION_1)
    const COLORIZED_MOVES = PIECE_MOVES?.filter(move => {
      const notSamePlayer = !board[move]?.name.startsWith(PLAYER)
      return notSamePlayer
    })

    setColorizedMoves([...COLORIZED_MOVES, POSITION_1])
  }

  function updateThreatenings() {
    const threateningsMoves = threatenings => {
      return threatenings.map(threatening => {
        const [piece, position] = threatening
        const nextMoves = getMovements(piece, position)
        return { position, piece, nextMoves }
      })
    }

    const THREATENINGS = board
      .map((threatening, position) => [threatening, position])
      .filter(threatening => threatening[0])

    const CURRENT = THREATENINGS.filter(t => t[0].name.startsWith(PLAYER))
    const CONTRARY = THREATENINGS.filter(t => !t[0].name.startsWith(PLAYER))

    const CURRENT_MOVES = threateningsMoves(CURRENT)
    const CONTRARY_MOVES = threateningsMoves(CONTRARY)

    setThreatenings({ CURRENT_MOVES, CONTRARY_MOVES })
  }

  function updateKings() {
    const CURRENT_KING = board.findIndex(king => {
      return king?.name === PLAYER + "_KING"
    })
    const CONTRARY_KING = board.findIndex(king => {
      const contrary = {
        'W': 'B_KING',
        'B': 'W_KING'
      }
      return king?.name === contrary[PLAYER]
    })

    setKings({ CURRENT_KING, CONTRARY_KING })
  }

  function updateCheck() {
    const isCheck = (threateningsMoves, king) => {
      return threateningsMoves?.some(threatening => {
        return threatening.nextMoves.includes(king)
      })
    }

    const { CURRENT_MOVES, CONTRARY_MOVES } = threatenings
    const { CURRENT_KING, CONTRARY_KING } = kings

    const IS_THREATENING = isCheck(CONTRARY_MOVES, CURRENT_KING)
    const LEFT_IN_CHECK = isCheck(CURRENT_MOVES, CONTRARY_KING)

    setCheck({ IS_THREATENING, LEFT_IN_CHECK })
  }


  useEffect(() => {
    if (squares.length === 1) { // player has clicked once
      colorizeMoves()
    }
    if (squares.length === 2) { // player has clicked twice
      const invalidMove = !colorizedMoves?.includes(POSITION_2)
      const samePlayer = PIECE_1?.name[0] === PIECE_2?.name[0]

      if (invalidMove || samePlayer) {
        resetChess()
      } else {
        updateBoard()
        resetChess()
        setTurn(turn => !turn)
      }
    }
  }, [squares])


  useEffect(() => {
    updateThreatenings()
    updateKings()
  }, [turn])

  useEffect(() => {
    updateCheck()
  }, [kings])

  useEffect(() => {
    console.log(kings);
    console.log(check);
  }, [check])


  return (
    <ChessContext.Provider value={{
      board,
      setBoard,
      squares,
      setSquares,
      positions,
      setPositions,
      colorizedMoves,
      setColorizedMoves,
      turn,
      setTurn,
      threatenings,
      setThreatenings,
      kings,
      setKings,
      check,
      setCheck,
      PLAYER
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}