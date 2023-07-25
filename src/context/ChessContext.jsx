import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  // const [copy, setCopy] = useState({})
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

  const {
    squares: [PIECE_1, PIECE_2],
    positions: [POS_1, POS_2]
  } = chess

  const FILLED_SQUARES = chess.board.map((piece, pos) => piece && pos)
  const PLAYER = chess.turn ? 'W' : 'B'
  const PIECE_MOVES = position => PIECE_1?.getMoves(position, FILLED_SQUARES)

  const updateBoard = () => {
    const NEW_BOARD = [...chess.board]

    NEW_BOARD[POS_1] = null
    NEW_BOARD[POS_2] = PIECE_1

    return NEW_BOARD
  }

  const isCheck = () => {
    const CONTRARY_KING = chess.board.findIndex(king => {
      const contrary = {
        'W': 'B_KING',
        'B': 'W_KING'
      }
      return king?.name === contrary[PLAYER]
    })

    const MOVES = PIECE_MOVES(POS_2)
    const IS_CHECK = MOVES.includes(CONTRARY_KING)

    return { CONTRARY_KING, MOVES, IS_CHECK }
  }

  useEffect(() => {
    if (chess.squares.length === 2) { // this means that the player has clicked twice
      setChess(chess => {
        const invalidMove = !chess.moves?.includes(POS_2)
        const samePlayer = PIECE_1?.name[0] === PIECE_2?.name[0]

        return invalidMove || samePlayer ? {
          ...chess,
          squares: [],
          positions: [],
          moves: [],
        } : {
          board: updateBoard(),
          squares: [],
          positions: [],
          moves: [],
          check: isCheck(),
          turn: !chess.turn
        }
      })
    } else {
      setChess(chess => { // this colorize the allowed moves
        const MOVES = PIECE_MOVES(POS_1)
        const COLORIZED = MOVES?.filter(move => {
          const piece = chess.board[move]
          return !piece?.name.startsWith(PLAYER)
        })

        return { ...chess, moves: COLORIZED }
      })
    }
  }, [chess.squares])


  // useEffect(() => {
  //   if(chess.check.IS_CHECK) {
  //     setCopy(chess)
  //   }

  //   if(copy?.check?.IS_CHECK) {
  //     console.log('STILL IN CHECK');
  //     setChess(copy)
  //   }
  //  }, [chess.check])

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