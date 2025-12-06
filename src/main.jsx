import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext' // <--- Importar
import { ProductProvider } from './context/ProductContext'
import { AuthProvider } from './context/AuthContext'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <ProductProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </ProductProvider>
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>,
)