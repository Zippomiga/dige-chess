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


  function resetChess() {
    setSquares([])
    setPositions([])
    setLastMove(true)
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
    const threatenings = playerPieces(player, board)

    return threatenings.map(threat => {
      const position = board.indexOf(threat)
      return threat?.getMoves(position, filledSquares(board))
    })
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


  const kingCantMove = () => {
    const king = currentBoard[CURRENT_KING]
    const moves = king.getMoves(CURRENT_KING, filledSquares())
    const kingMoves = fixedMoves(moves)

    return kingMoves.every(kingMove => {
      return CONTRARY_MOVES.flat().includes(kingMove)
    })
  }


  const isCheck = (threateningsMoves, king) => {
    return threateningsMoves.some(moves => moves.includes(king))
  }


  const isCheckMate = () => {
    for (let i = 0; i < CURRENT_PIECES.length; i++) {
      const currentPiece = CURRENT_PIECES[i]
      const currentMoves = CURRENT_MOVES[i]
      const currentCoord = currentBoard.indexOf(currentPiece)

      const isKing = currentPiece.name.includes("KING")
      const notMovesToCheck = !currentMoves.length

      if (isKing || notMovesToCheck) { continue }

      for (let j = 0; j < currentMoves.length; j++) {
        const newCoord = currentMoves[j]
        const newBoard = [...currentBoard]

        newBoard[currentCoord] = null
        newBoard[newCoord] = currentPiece

        const newMovements = threateningsMoves('contrary', newBoard)
        const contraryMoves = [...new Set(newMovements.flat())]

        const allPiecesChecked = (CURRENT_PIECES.length - 1) === i
        const allMovesChecked = (currentMoves.length - 1) === j

        const NOT_CHECK_MATE = !contraryMoves.includes(CURRENT_KING)
        const IS_CHECK_MATE = allMovesChecked && allPiecesChecked

        if (NOT_CHECK_MATE) { return false }
        if (IS_CHECK_MATE) { return true }
      }
    }
  }

  const CURRENT_PIECES = playerPieces('current')
  const CONTRARY_PIECES = playerPieces('contrary')

  const CURRENT_MOVES = threateningsMoves('current')
  const CONTRARY_MOVES = threateningsMoves('contrary')

  const CURRENT_KING = kingPosition('current')
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
    if ((IS_THREATENED || LEFT_IN_CHECK) && kingCantMove()) {
      console.log(isCheckMate() ? 'CHECK MATE' : 'NOT CHECK MATE');
    }
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
      turn,
      setTurn,
      setLastMovement,
      colorizedMoves: colorizedMoves(),
      CURRENT_KING,
      CONTRARY_KING,
      IS_THREATENED,
      LEFT_IN_CHECK,
      PLAYER
    }}>
      {props.children}
    </ChessContext.Provider>
  )
}