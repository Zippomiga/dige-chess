import { createContext } from "react";
import { ChessContext } from "./ChessContext";


export const CheckContext = createContext()

export default function CheckContextProvider(props) {

  return (
    <CheckContext.Provider value={{}}>
      {props.children}
    </CheckContext.Provider>
  )
}