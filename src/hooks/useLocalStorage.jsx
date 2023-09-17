import { getPiece } from "../Game Functions/auxiliar-functions"
import { useState, useEffect } from "react"


export default function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key)
  const parsedValue = JSON.parse(storedValue)

  let initialState = storedValue ? parsedValue : initialValue

  if (
    storedValue &&
    key === 'currentBoard' ||
    key === 'previousBoard'
  ) {
    initialState = parsedValue.map(parsedSquare => {
      return getPiece(parsedSquare?.name)
    })
  }

  const [value, setValue] = useState(initialState)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}