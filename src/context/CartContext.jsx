import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto (la "nube" donde viven los datos)
const CartContext = createContext();

// 2. Creamos un hook personalizado para usar el carrito fácil
export const useCart = () => useContext(CartContext);

// 3. El proveedor que envolverá a toda la app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Verificamos si el producto ya está en el carrito
      const itemExists = prevItems.find((item) => item.id === product.id);
      
      if (itemExists) {
        // Si ya está, le sumamos 1 a la cantidad
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si no está, lo agregamos con cantidad 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calcular el precio total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Calcular cantidad de items (para el numerito rojo del icono)
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};