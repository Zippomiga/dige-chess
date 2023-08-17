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



  const filledSquares = (board = currentBoard) => {
    return board.map((filled, position) => filled && position)
  }



  const fixMovements = movements => {
    return movements.filter(move => {
      const piece = currentBoard[move]
      return !piece?.name.startsWith(PLAYER)
    })
  } // not taken into account squares where there are pieces of the same player



  const COLORIZED_MOVES = () => {
    const MOVES = SQUARE_1?.getMoves(POSITION_1, filledSquares()) || []
    const COLORIZED = fixMovements(MOVES)

    return [...COLORIZED, POSITION_1]
  }



  const THREATENINGS_MOVES = () => {
    const threatsMoves = threats => {
      return threats.map(threat => {
        const position = currentBoard.indexOf(threat)
        return threat?.getMoves(position, filledSquares())
      })
    }
    const THREATS = currentBoard.filter(threat => threat !== null)
    const CURRENT = THREATS.filter(threat => threat.name.startsWith(PLAYER))
    const CONTRARY = THREATS.filter(threat => !threat.name.startsWith(PLAYER))

    return {
      CURRENT,
      CONTRARY,
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
    const { CURRENT, CURRENT_MOVES, CONTRARY_MOVES } = THREATENINGS_MOVES()
    const { CURRENT_KING } = KINGS_POSITIONS()
    const { IS_THREATENED, LEFT_IN_CHECK } = CHECKS()

    // const KING = currentBoard[CURRENT_KING]
    // const MOVES = KING.getMoves(CURRENT_KING, filledSquares())
    // const KING_MOVES = fixMovements(MOVES)

    // const KING_CANT_MOVE = KING_MOVES // TEÓRICAMENTE ESTO NO VA A SER NECESARIO
    //   .every(currentKingMove => {
    //     return CONTRARY_MOVES
    //       .flat()
    //       .includes(currentKingMove)
    //   })

    if (IS_THREATENED || LEFT_IN_CHECK) {
      // console.log({ KING_MOVES, KING_CANT_MOVE });

      for (let i = 0; i < CURRENT.length; i++) {
        const currentPiece = CURRENT[i]
        const currentMoves = CURRENT_MOVES[i]
        const currentCoord = currentBoard.indexOf(currentPiece)

        console.log({ currentCoord, currentPiece, currentMoves  });

        for (let j = 0; j < currentMoves.length; j++) {
          const newCoord = currentMoves[j]
          const newBoard = [...currentBoard]

          newBoard[currentCoord] = null
          newBoard[newCoord] = currentPiece

          const CONTRARY = newBoard.filter(threat => {
            return threat !== null && !threat.name.startsWith(PLAYER)
          })

          const newMoves = CONTRARY.map(threat => {
            const position = newBoard.indexOf(threat)
            return threat?.getMoves(position, filledSquares(newBoard))
          })

          const uniqueMoves = [...new Set(newMoves.flat())].sort((a, b) => a - b)
          const isKing = currentPiece.name.includes("KING")
          const keepThreatened = uniqueMoves.includes(CURRENT_KING)
          
          const PROTECTED_KING = !isKing && !keepThreatened

          console.log({ newCoord, uniqueMoves, PROTECTED_KING });
        }
      }
      // 1. LA PIEZA DEL CURRENT PLAYER TIENE QUE HACER UN MOVIMIENTO, Y DESPUES DE ESE MOVIMIENTO COMPROBAR SI SE SIGUE EN JAQUE
      // 2. EL JAQUE SE COMPRUEBA OBTENIENDO NUEVAMENTE LOS MOVIMIENTOS DE LAS PIEZAS DEL CONTRARIO DESPUES DE HABER MOVIDO LA PIEZA
      // 3. SI SIGUE EN JAQUE, CONTINUAR CON EL LOOP HASTA ENCONTRAR LA PIEZA QUE BLOQUEE EL JAQUE
      // 4. SI SE ENCUENTRA UNA PIEZA QUE BLOQUEE EL JAQUE, DEVOLVER FALSE (SE PUEDE BLOQUEAR)
      // SI NO SE ENCUENTRA, DEVOLVER TRUE (NO SE PUEDE BLOQUEAR => ES JAQUE MATE)
    }
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
    resetChess()
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