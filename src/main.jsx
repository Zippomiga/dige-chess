import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ChessContextProvider from './context/ChessContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChessContextProvider>
      <App />
    </ChessContextProvider>
  </React.StrictMode>
)