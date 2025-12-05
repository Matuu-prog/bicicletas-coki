import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext'; // <--- Importamos el carrito

const ProductDetail = () => {
  const { id } = useParams(); 
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart(); // <--- Función para agregar

  if (!product) {
    return <div className="text-center py-20 text-2xl">Producto no encontrado 😢</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Migas de pan */}
        <nav className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-blue-600">Inicio</Link> &gt;{' '}
            <Link to="/catalogo" className="hover:text-blue-600">Catálogo</Link> &gt;{' '}
            <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* FOTO GRANDE */}
            <div className="h-96 md:h-[600px] bg-gray-100 flex items-center justify-center p-6">
               <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500" />
            </div>

            {/* INFO DEL PRODUCTO */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-blue-600 font-bold uppercase text-sm mb-2">{product.category}</span>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-gray-900 mb-6">${product.price.toLocaleString('es-AR')}</p>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Excelente calidad y durabilidad. Ideal para tus aventuras en Salta.
                Cuenta con garantía oficial de Coki y servicio técnico especializado.
              </p>

              {/* BOTONES DE ACCIÓN */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                 <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition shadow-lg flex justify-center items-center gap-2"
                 >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    Agregar al Carrito
                 </button>
                 
                 <a 
                    href={`https://wa.me/543874123456?text=Quiero el producto ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-green-500 text-green-600 font-bold py-3 px-6 rounded-xl hover:bg-green-50 transition text-center flex justify-center items-center gap-2"
                 >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    Consultar WhatsApp
                 </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;