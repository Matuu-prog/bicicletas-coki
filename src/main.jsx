import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext' // <--- Importar
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* <--- Envolvemos todo aquí */}
      <HashRouter>
        <App />
      </HashRouter>
    </CartProvider>
  </React.StrictMode>,
)