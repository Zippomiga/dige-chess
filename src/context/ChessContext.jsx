import { CHESS_BOARD } from "../Game Functions/board";
import { createContext, useState, useEffect } from "react";


export const ChessContext = createContext()

export default function ChessContextProvider(props) {
  const [currentBoard, setCurrentBoard] = useState(CHESS_BOARD)
  const [previousBoard, setPreviousBoard] = useState([])
  const [lastMove, setLastMove] = useState(false)

  const [squares, setSquares] = useState([])
  const [positions, setPositions] = useState([])
  const [turn, setTurn] = useState(true)

  const [SQUARE_1, SQUARE_2] = squares
  const [POSITION_1, POSITION_2] = positions
  const PLAYER = turn ? 'W' : 'B'



  const getMovements = (piece, position) => {
    const filledSquares = currentBoard.map((filled, index) => filled && index)
    return piece?.getMoves(position, filledSquares)
  }



  const fixMovements = movements => {
    return movements.filter(move => {
      const piece = currentBoard[move]
      return !piece?.name.startsWith(PLAYER)
    })
  } // not taken into account squares where there are pieces of the same player



  const COLORIZED_MOVES = () => {
    const MOVES = getMovements(SQUARE_1, POSITION_1) || []
    const COLORIZED = fixMovements(MOVES)
    return [...COLORIZED, POSITION_1]
  }



  const THREATENINGS_MOVES = () => {
    const threatsMoves = threats => {
      return threats.map(threat => {
        const position = currentBoard.indexOf(threat)
        return getMovements(threat, position)
      })
    }
    const THREATS = currentBoard.filter(threat => threat !== null)
    const CURRENT = THREATS.filter(threat => threat.name.startsWith(PLAYER))
    const CONTRARY = THREATS.filter(threat => !threat.name.startsWith(PLAYER))

    return {
      CURRENT_MOVES: threatsMoves(CURRENT),
      CONTRARY_MOVES: threatsMoves(CONTRARY),
    }
  }



  const KINGS_POSITIONS = () => {
    const kingPosition = king => {
      return currentBoard.findIndex(k => k?.name === king[PLAYER])
    }

    const CURRENT = {
      'W': 'W_KING',
      'B': 'B_KING'
    }
    const CONTRARY = {
      'W': 'B_KING',
      'B': 'W_KING'
    }

    return {
      CURRENT_KING: kingPosition(CURRENT),
      CONTRARY_KING: kingPosition(CONTRARY)
    }
  }



  const CHECKS = () => {
    const isCheck = (threatsMoves, king) => {
      return threatsMoves.some(moves => moves.includes(king))
    }

    const { CURRENT_MOVES, CONTRARY_MOVES } = THREATENINGS_MOVES()
    const { CURRENT_KING, CONTRARY_KING } = KINGS_POSITIONS()

    return {
      IS_THREATENED: isCheck(CONTRARY_MOVES, CURRENT_KING),
      LEFT_IN_CHECK: isCheck(CURRENT_MOVES, CONTRARY_KING)
    }
  }



  const CHECK_MATE = () => {
    const { CURRENT_KING } = KINGS_POSITIONS()
    const { CURRENT_MOVES, CONTRARY_MOVES } = THREATENINGS_MOVES()

    const KING = currentBoard[CURRENT_KING]
    const MOVES = getMovements(KING, CURRENT_KING)
    const KING_MOVES = fixMovements(MOVES)

    if (!KING_MOVES.length) return

    const KING_CANT_MOVE = KING_MOVES
      .every(currentKingMove => {
        return CONTRARY_MOVES
          .flat()
          .includes(currentKingMove)
      })

    const THREATS = CONTRARY_MOVES.filter(contraryMoves => {
      return contraryMoves.some(move => {
        return KING_MOVES.includes(move)
      })
    })

    const PLAYER_CANT_BLOCK = !THREATS
      .flat()
      .some(threatMove => {
        return CURRENT_MOVES
          .flat()
          .includes(threatMove)
      })

    // const curr = CURRENT_MOVES.flat().filter(m => CONTRARY_MOVES.flat().includes(m))
    // const cont = CONTRARY_MOVES.flat().filter(m => CURRENT_MOVES.flat().includes(m))

    console.log({ MOVES, KING_MOVES });
    console.log({ CURRENT_MOVES, CONTRARY_MOVES });
    console.log({ KING_CANT_MOVE, PLAYER_CANT_BLOCK });
    console.log(THREATS);
  }



  function updateBoards() {
    const NEW_BOARD = [...currentBoard]

    NEW_BOARD[POSITION_1] = null
    NEW_BOARD[POSITION_2] = SQUARE_1

    setPreviousBoard(currentBoard)
    setCurrentBoard(NEW_BOARD)
  }



  function updateChess() {
    const invalidMove = !COLORIZED_MOVES().includes(POSITION_2)
    const samePlayer = SQUARE_1?.name.startsWith(SQUARE_2?.name[0])

    if (invalidMove || samePlayer) {
      resetChess()
    } else {
      updateBoards()
      resetChess()
      setTurn(turn => !turn)
    }
  }



  function resetChess() {
    setSquares([])
    setPositions([])
    setLastMove(true)
  }



  function setLastMovement() {
    setCurrentBoard(previousBoard)
    setTurn(turn => !turn)
  }



  useEffect(() => {
    const CLICKED_TWICE = squares.length === 2
    const { LEFT_IN_CHECK } = CHECKS()

    if (CLICKED_TWICE) {
      updateChess()
    }
    if (LEFT_IN_CHECK) {
      setLastMovement()
    }
  }, [squares])


  useEffect(() => {
    CHECK_MATE()
  }, [turn])

  return (
    <ChessContext.Provider value={{
      currentBoard,
      setCurrentBoard,
      previousBoard,
      setPreviousBoard,
      lastMove,
      setLastMove,
      squares,
      setSquares,
      positions,
      setPositions,
      colorizedMoves: COLORIZED_MOVES(),
      turn,
      setTurn,
      kingsPositions: KINGS_POSITIONS(),
      checks: CHECKS(),
      PLAYER,
      setLastMovement
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}