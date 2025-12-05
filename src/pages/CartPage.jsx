import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Tu carrito está vacío 🛒</h2>
        <Link to="/catalogo" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Ir a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LISTA DE ITEMS */}
          <div className="lg:w-2/3 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Cantidad: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">${(item.price * item.quantity).toLocaleString('es-AR')}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline mt-1"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RESUMEN DE PAGO */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h3 className="text-lg font-bold mb-4">Resumen</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Envío</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
              <div className="border-t pt-4 flex justify-between mb-6">
                <span className="text-xl font-bold">Total</span>
                <span className="text-xl font-bold text-blue-600">${cartTotal.toLocaleString('es-AR')}</span>
              </div>
              
              <Link 
                to="/checkout"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Iniciar Pago
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;