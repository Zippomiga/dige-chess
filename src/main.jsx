import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ChessContextProvider from './context/ChessContext'
import CheckContextProvider from './context/CheckContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChessContextProvider>
      <CheckContextProvider>
        <App />
      </CheckContextProvider>
    </ChessContextProvider>
  </React.StrictMode>
)