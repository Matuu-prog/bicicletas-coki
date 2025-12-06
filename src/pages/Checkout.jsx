import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { cartItems, cartTotal } = useCart();
  const { addOrder } = useProducts();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulamos una demora de 2 segundos como si procesara el pago
    setTimeout(() => {

      addOrder({
        customer: "Cliente Simulado", // Aquí podrías usar los datos del input real
        items: cartItems,
        total: cartTotal
      });

      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-2">¡Compra Exitosa!</h2>
        <p className="text-green-700 max-w-md">
          Gracias por tu compra! Recibirás un email con tu factura.
        </p>
        <Link to="/" className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">
  Volver al inicio
</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Finalizar Compra</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-4">Datos Personales</h3>
            </div>
            
            <input required type="text" placeholder="Nombre completo" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
            <input required type="email" placeholder="Email" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
            <input required type="tel" placeholder="Teléfono" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
            <input required type="text" placeholder="Dirección de envío" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />

            <div className="col-span-2 mt-4">
              <h3 className="text-lg font-semibold mb-4">Datos de Pago (Simulado)</h3>
            </div>
            
            <input required type="text" placeholder="Número de Tarjeta" className="col-span-2 border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
            <input required type="text" placeholder="MM/AA" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
            <input required type="text" placeholder="CVC" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <button 
            type="submit" 
            disabled={isProcessing}
            className={`w-full mt-8 py-4 rounded-lg text-white font-bold text-lg transition ${
              isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isProcessing ? 'Procesando...' : 'Pagar Ahora'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;