import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams(); 
  const { products } = useProducts();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  if (!product) return <div className="text-center py-20 text-2xl">Producto no encontrado 😢</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-500 mb-6">
            <Link to="/catalogo">Catálogo</Link> &gt; <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-96 md:h-[600px] bg-gray-100 flex items-center justify-center p-6">
               <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-blue-600 font-bold uppercase text-sm mb-2">{product.category} {product.subcategory && `/ ${product.subcategory}`}</span>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  {/* 1. PRECIO LISTA SIN TACHAR */}
                  <p className="text-gray-500 text-lg mb-1">
                      Precio de Lista: <span className="font-semibold text-gray-700">${product.listPrice?.toLocaleString('es-AR')}</span>
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-4xl font-bold text-blue-600">
                          ${product.price.toLocaleString('es-AR')}
                      </p>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded uppercase">
                          Contado / Transferencia
                      </span>
                  </div>
              </div>

              {/* 2. DESCRIPCIÓN DINÁMICA (Real) */}
              <p className="text-gray-600 text-lg mb-8 leading-relaxed whitespace-pre-line">
                 {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                 <button onClick={() => addToCart(product)} className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition shadow-lg">
                    Agregar al Carrito
                 </button>
                 <a href={`https://wa.me/543874123456?text=Quiero ${product.name}`} target="_blank" className="flex-1 border-2 border-green-500 text-green-600 font-bold py-3 px-6 rounded-xl hover:bg-green-50 transition text-center flex items-center justify-center">
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