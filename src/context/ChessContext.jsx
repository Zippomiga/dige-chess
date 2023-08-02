import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [board, setBoard] = useState(CHESS_BOARD)
  const [prevBoard, setPrevBoard] = useState([])

  const [squares, setSquares] = useState([])
  const [positions, setPositions] = useState([])
  const [colorizedMoves, setColorizedMoves] = useState([])

  const [threats, setThreats] = useState({})
  const [kings, setKings] = useState({})
  const [check, setCheck] = useState({})

  const [turn, setTurn] = useState(true)
  const PLAYER = turn ? 'W' : 'B'

  const [PIECE_1, PIECE_2] = squares
  const [POSITION_1, POSITION_2] = positions

  const getMovements = (piece, position) => {
    const filledSquares = (filled, index) => filled && index
    return piece.getMoves(position, board.map(filledSquares))
  }

  function updateBoards() {
    const NEW_BOARD = [...board]
    NEW_BOARD[POSITION_1] = null
    NEW_BOARD[POSITION_2] = PIECE_1

    setPrevBoard(board)
    setBoard(NEW_BOARD)
  }

  function resetChess() {
    setSquares([])
    setPositions([])
    setColorizedMoves([])
  }

  function colorizeMoves() {
    const PIECE_MOVES = getMovements(PIECE_1, POSITION_1)
    const COLORIZED_MOVES = PIECE_MOVES.filter(square => {
      const notSamePlayer = !board[square]?.name.startsWith(PLAYER)
      return notSamePlayer
    })

    setColorizedMoves([...COLORIZED_MOVES, POSITION_1])
  }

  function updateThreatenings() {
    const threatsMoves = threats => {
      const nextMoves = ([piece, position]) => getMovements(piece, position)
      return threats.map(nextMoves)
    }
    const THREATS = board
      .map((threat, position) => [threat, position])
      .filter(threat => threat[0])

    const CURRENT = THREATS.filter(threat => threat[0].name.startsWith(PLAYER))
    const CONTRARY = THREATS.filter(threat => !threat[0].name.startsWith(PLAYER))

    setThreats({
      CURRENT_MOVES: threatsMoves(CURRENT),
      CONTRARY_MOVES: threatsMoves(CONTRARY),
    })
  }

  function updateKings() {
    const kingPosition = king => board
      .findIndex(k => k?.name === king[PLAYER])

    const CURRENT = {
      'W': 'W_KING',
      'B': 'B_KING'
    }
    const CONTRART = {
      'W': 'B_KING',
      'B': 'W_KING'
    }

    setKings({
      CURRENT_KING: kingPosition(CURRENT),
      CONTRARY_KING: kingPosition(CONTRART)
    })
  }

  function updateCheck() {
    const isCheck = (threateningsMoves, king) => {
      const isKingThere = nextMoves => nextMoves.includes(king)
      return threateningsMoves?.some(isKingThere)
    }
    const { CURRENT_MOVES, CONTRARY_MOVES } = threats
    const { CURRENT_KING, CONTRARY_KING } = kings

    setCheck({
      IS_THREATENING: isCheck(CONTRARY_MOVES, CURRENT_KING),
      LEFT_IN_CHECK: isCheck(CURRENT_MOVES, CONTRARY_KING)
    })
  }


  useEffect(() => {
    if (squares.length === 1) { // player has clicked once
      colorizeMoves()
    }
    if (squares.length === 2) { // player has clicked twice
      const invalidMove = !colorizedMoves.includes(POSITION_2)
      const samePlayer = PIECE_1.name.startsWith(PIECE_2?.name[0])

      if (invalidMove || samePlayer) {
        resetChess()
      } else {
        updateBoards()
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
    if (check.LEFT_IN_CHECK) {
      setBoard(prevBoard)
      setTurn(turn => !turn)
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
      colorizedMoves,
      setColorizedMoves,
      turn,
      setTurn,
      threats,
      setThreats,
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