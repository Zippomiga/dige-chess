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


  function updateBoards() {
    const NEW_BOARD = [...currentBoard]

    NEW_BOARD[POSITION_1] = null
    NEW_BOARD[POSITION_2] = SQUARE_1

    setPreviousBoard(currentBoard)
    setCurrentBoard(NEW_BOARD)
  }


  function updateChess() {
    const invalidMove = !colorizedMoves().includes(POSITION_2)
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


  const filledSquares = (board = currentBoard) => {
    return board.map((filled, position) => filled && position)
  }


  const fixedMoves = movements => {
    return movements.filter(move => {
      const piece = currentBoard[move]
      return !piece?.name.startsWith(PLAYER)
    })
  } // not taken into account squares where there are pieces of the same player


  const colorizedMoves = () => {
    const movements = SQUARE_1?.getMoves(POSITION_1, filledSquares()) || []
    const colorized = fixedMoves(movements)
    return [...colorized, POSITION_1]
  }


  const playerPieces = (player, board = currentBoard) => {
    return board.filter(threat => {
      switch (player) {
        case 'current':
          return threat !== null && threat.name.startsWith(PLAYER)
        case 'contrary':
          return threat !== null && !threat.name.startsWith(PLAYER)
      }
    })
  }


  const threateningsMoves = (player, board = currentBoard) => {
    const threatsMoves = pieces => pieces.map(threat => {
      const position = board.indexOf(threat)
      return threat?.getMoves(position, filledSquares(board))
    })

    switch (player) {
      case 'current':
        return threatsMoves(CURRENT_PIECES)
      case 'contrary':
        return threatsMoves(CONTRARY_PIECES)
    }
  }


  const kingPosition = player => {
    const current = {
      'W': 'W_KING',
      'B': 'B_KING'
    }

    const contrary = {
      'W': 'B_KING',
      'B': 'W_KING'
    }

    return currentBoard.findIndex(king => {
      switch (player) {
        case 'current':
          return king?.name === current[PLAYER]
        case 'contrary':
          return king?.name === contrary[PLAYER]
      }
    })
  }


  const isCheck = (threateningsMoves, king) => {
    return threateningsMoves.some(moves => moves.includes(king))
  }


  const kingCantMove = () => {
    const KING = currentBoard[CURRENT_KING]
    const MOVES = KING.getMoves(CURRENT_KING, filledSquares())
    const KING_MOVES = fixedMoves(MOVES)

    return KING_MOVES.every(kingMove => {
      return CONTRARY_MOVES.flat().includes(kingMove)
    })
  }

  const isCheckMate = () => {
    let checkMate = false

    if (kingCantMove() && (IS_THREATENED || LEFT_IN_CHECK)) {
      for (let i = 0; i < CURRENT_PIECES.length; i++) {
        if (checkMate) { break }

        const currentPiece = CURRENT_PIECES[i]
        const currentMoves = CURRENT_MOVES[i]
        const currentCoord = currentBoard.indexOf(currentPiece)

        if (currentPiece.name.includes("KING")) { continue }

        // console.log({ currentPiece, currentMoves, currentCoord });

        for (let j = 0; j < currentMoves.length; j++) {
          if (checkMate) { break }

          const newCoord = currentMoves[j]
          const newBoard = [...currentBoard]

          newBoard[currentCoord] = null
          newBoard[newCoord] = currentPiece

          const contraryMoves = threateningsMoves('contrary', newBoard)
          const newMovements = [...new Set(contraryMoves.flat())]

          // console.log({ newCoord, newBoard, newMovements });

          if (!newMovements.includes(CURRENT_KING)) { return }

          const everyPieceChecked = i === CURRENT_PIECES.length - 1
          const everyMoveChecked = j === currentMoves.length - 1

          checkMate = everyPieceChecked && everyMoveChecked
        }
      }
      return checkMate
    }
  }


  const CURRENT_PIECES = playerPieces('current')
  const CURRENT_MOVES = threateningsMoves('current')
  const CURRENT_KING = kingPosition('current')

  const CONTRARY_PIECES = playerPieces('contrary')
  const CONTRARY_MOVES = threateningsMoves('contrary')
  const CONTRARY_KING = kingPosition('contrary')

  const IS_THREATENED = isCheck(CONTRARY_MOVES, CURRENT_KING)
  const LEFT_IN_CHECK = isCheck(CURRENT_MOVES, CONTRARY_KING)


  useEffect(() => {
    if (squares.length === 2) { // player has clicked twice
      updateChess()
    }
    if (LEFT_IN_CHECK) {
      setLastMovement()
    }
  }, [squares])


  useEffect(() => {
    if (isCheckMate()) { console.log('JAQUE MATE') };
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
      colorizedMoves: colorizedMoves(),
      turn,
      setTurn,
      kingsPositions: { CURRENT_KING, CONTRARY_KING },
      checks: { IS_THREATENED, LEFT_IN_CHECK },
      PLAYER,
      setLastMovement
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}