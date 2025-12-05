import React from 'react';
import { Link } from 'react-router-dom'; // <--- Para navegar
import { useCart } from '../context/CartContext'; // <--- Para el carrito
import { products } from '../data/products'; // <--- Usamos los datos REALES

const FeaturedProducts = () => {
  const { addToCart } = useCart();

  // Seleccionamos solo los primeros 4 productos para mostrar en la home
  const featured = products.slice(0, 4);

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
          Nuevos productos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* 1. IMAGEN CON ENLACE AL DETALLE */}
              <Link to={`/producto/${product.id}`} className="block relative">
                <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 lg:aspect-none lg:h-56 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Etiqueta de categoría */}
                  <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 text-xs font-bold text-gray-600 rounded-md shadow-sm">
                    {product.subcategory}
                  </span>
                </div>
              </Link>
              
              <div className="p-5 flex flex-col flex-grow">
                {/* 2. TÍTULO CON ENLACE AL DETALLE */}
                <Link to={`/producto/${product.id}`} className="block">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                    {product.category}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight hover:text-blue-600 transition-colors">
                    {product.name}
                    </h3>
                </Link>

                {/* Precio */}
                <div className="mt-auto">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-xl font-bold text-gray-900">${product.price.toLocaleString('es-AR')}</p>
                    </div>

                    {/* 3. BOTÓN "AGREGAR AL CARRITO" */}
                    <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 active:scale-95 transform duration-150"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Agregar
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <Link to="/catalogo" className="inline-block px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Ver todo el catálogo
            </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;