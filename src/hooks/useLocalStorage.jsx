import { useState, useEffect } from "react"


export default function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key)
  const parsedValue = JSON.parse(storedValue)

  const setInitial = newValue => {
    return storedValue ? newValue : initialValue
  }

  let initialState;

  switch (key) {
    case 'currentBoard':
      const fixedBoard = parsedValue?.map(square => {
        const fixedPiece = initialValue.find(piece => piece?.name === square?.name)
        return fixedPiece
      })
      initialState = setInitial(fixedBoard)
      break;
    // case 'currentMoves':
      // initialState = setInitial([])
      // break;
    default:
      initialState = setInitial(parsedValue)
  }

  const [value, setValue] = useState(initialState)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])


  return [value, setValue]
}