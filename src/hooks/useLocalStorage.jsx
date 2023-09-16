import { useState, useEffect } from "react"
import { CHESS_BOARD } from "../Game Functions/chessBoard"


export default function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key)
  const parsedValue = JSON.parse(storedValue)

  const setInitial = newValue => {
    return storedValue ? newValue : initialValue
  }

  let initialState;

  switch (key) {
    case 'currentBoard':
    case 'previousBoard':
    case 'currentEated':
    case 'previousEated':
      const fixedValue = parsedValue?.map(parsedSquare => {
        const fixedPiece = CHESS_BOARD.find(piece => piece?.name === parsedSquare?.name)
        return fixedPiece
      })
      initialState = setInitial(fixedValue)
      break;
    default:
      initialState = setInitial(parsedValue)
  }

  const [value, setValue] = useState(initialState)

  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])


  return [value, setValue]
}