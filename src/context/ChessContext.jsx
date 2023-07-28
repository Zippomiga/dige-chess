import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [copy, setCopy] = useState({})
  // const [board, setBoard] = useState(CHESS_BOARD)
  // const [squares, setSquares] = useState([])
  // const [positions, setPositions] = useState([])
  // const [moves, setMoves] = useState([])
  // const [check, setCheck] = useState({})
  // const [turn, setTurn] = useState(true)

  const [chess, setChess] = useState({
    board: CHESS_BOARD,
    squares: [],
    positions: [],
    moves: [],
    check: {},
    turn: true
  })

  const [PIECE_1, PIECE_2] = chess.squares
  const [POS_1, POS_2] = chess.positions
  const PLAYER = chess.turn ? 'W' : 'B'


  const PIECE_MOVES = (piece, position) => {
    const filledSquares = chess.board
      .map((piece, position) => piece && position)

    return piece?.getMoves(position, filledSquares)
  }


  const updateBoard = () => {
    const NEW_BOARD = [...chess.board]

    NEW_BOARD[POS_1] = null
    NEW_BOARD[POS_2] = PIECE_1

    return NEW_BOARD
  }


  const updateCheck = () => {
    const CONTRARY_KING = chess.board.findIndex(king => {
      const contrary = {
        'W': 'B_KING',
        'B': 'W_KING'
      }
      return king?.name === contrary[PLAYER]
    })

    const MOVES = PIECE_MOVES(PIECE_1, POS_2)
    const IS_CHECK = MOVES.includes(CONTRARY_KING)

    return { PIECE_1, CONTRARY_KING, MOVES, IS_CHECK }
  }


  const updateChess = () => {
    return {
      board: updateBoard(),
      squares: [],
      positions: [],
      moves: [],
      check: updateCheck(),
      turn: !chess.turn
    }
  }


  const resetChess = chess => {
    return {
      ...chess,
      squares: [],
      positions: [],
      moves: []
    }
  }


  function colorizeMoves() {
    const MOVES = PIECE_MOVES(PIECE_1, POS_1)

    const COLORIZED = MOVES?.filter(move => {
      const piece = chess.board[move]

      return !piece?.name.startsWith(PLAYER)
    })

    setChess(chess => { return { ...chess, moves: COLORIZED } })
  }


  useEffect(() => {
    const clickedTwice = chess.squares.length === 2

    if (clickedTwice) {
      const invalidMove = !chess.moves?.includes(POS_2)
      const samePlayer = PIECE_1?.name[0] === PIECE_2?.name[0]

      setChess(chess => {
        return invalidMove || samePlayer
          ? resetChess(chess)
          : updateChess()
      })
    } else { colorizeMoves() }
  }, [chess.squares])


  useEffect(() => {
    if (chess.check.IS_CHECK) {
      setCopy(chess)
    }

    const stillInCheck = () => {
      const lastKing = copy.check?.CONTRARY_KING
      const lastPiece = copy.check?.PIECE_1
      const lastPosition = copy.board?.indexOf(lastPiece)
      const lastMoves = PIECE_MOVES(lastPiece, lastPosition)

      return lastMoves?.includes(lastKing)
    }

    if (stillInCheck()) {
      setChess(chess => {
        return {
          ...chess,
          check: copy.check,
          turn: copy.turn
        }
      })
    }
  }, [chess.check])


  return (
    <ChessContext.Provider value={{
      chess,
      setChess,
      PLAYER
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}