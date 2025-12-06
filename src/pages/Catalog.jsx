import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <--- Importamos Link
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext'; // <--- 1. Importamos el hook del carrito

const Catalog = () => {
  const { products } = useProducts();
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [openMenu, setOpenMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { addToCart } = useCart(); // <--- 2. Sacamos la función para agregar

  // ... (Mantenemos igual la configuración del menú categoriesMenu) ...
  const categoriesMenu = [
    { name: 'Todos los productos', type: 'simple', value: 'Todos' },
    { name: 'Bicicletas', type: 'dropdown', subcategories: ['Montaña', 'Ruta', 'Urbana', 'Eléctrica'] },
    { name: 'Accesorios', type: 'dropdown', subcategories: ['Cascos', 'Luces', 'Candados'] },
    { name: 'Indumentaria', type: 'dropdown', subcategories: ['Remeras', 'Pantalones', 'Guantes', 'Calzado'] },
    { name: 'Repuestos', type: 'simple', value: 'Repuestos' },
  ];

  // ... (Mantenemos igual la lógica de filteredProducts y toggleMenu) ...
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesCategory = true;
    if (selectedFilter !== 'Todos') {
      if (product.category === selectedFilter) matchesCategory = true;
      else if (product.subcategory === selectedFilter) matchesCategory = true;
      else matchesCategory = false;
    }
    return matchesSearch && matchesCategory;
  });

  const toggleMenu = (menuName) => {
    if (openMenu === menuName) setOpenMenu(null);
    else setOpenMenu(menuName);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CABECERA (Igual que antes) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900">Catálogo</h1>
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Buscar bicicleta, casco..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* SIDEBAR (Igual que antes) */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Categorías</h3>
              <ul className="space-y-1">
                {categoriesMenu.map((item) => (
                  <li key={item.name}>
                    {item.type === 'simple' ? (
                      <button
                        onClick={() => setSelectedFilter(item.value)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedFilter === item.value ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <div>
                        <button
                          onClick={() => { toggleMenu(item.name); setSelectedFilter(item.name); }}
                          className={`w-full flex justify-between items-center text-left px-3 py-2 rounded-md transition-colors ${selectedFilter === item.name || openMenu === item.name ? 'text-blue-700 font-bold bg-gray-50' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          {item.name}
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform transition-transform duration-200 ${openMenu === item.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openMenu === item.name && (
                          <ul className="pl-4 mt-1 space-y-1 border-l-2 border-gray-100 ml-2">
                             <li><button onClick={() => setSelectedFilter(item.name)} className={`w-full text-left px-3 py-1.5 text-sm rounded-md ${selectedFilter === item.name ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}>Ver todo en {item.name}</button></li>
                            {item.subcategories.map((sub) => (
                              <li key={sub}>
                                <button onClick={() => setSelectedFilter(sub)} className={`w-full text-left px-3 py-1.5 text-sm rounded-md ${selectedFilter === sub ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}>{sub}</button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* GRILLA DE PRODUCTOS (AQUÍ ESTÁ EL CAMBIO IMPORTANTE) */}
          <div className="w-full md:w-3/4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 group flex flex-col justify-between">
                    
                    {/* 3. Envolvemos la IMAGEN en un Link para ir al detalle */}
                    <Link to={`/producto/${product.id}`} className="block relative">
                        <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 h-48 relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 text-xs font-bold text-gray-600 rounded-md shadow-sm">
                                {product.subcategory}
                            </span>
                        </div>
                    </Link>
                    
                    <div className="p-4 flex flex-col flex-grow">
                        {/* 4. Envolvemos el TÍTULO en un Link */}
                        <Link to={`/producto/${product.id}`} className="block">
                            <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                                {product.name}
                            </h3>
                        </Link>
                        
                        <p className="text-xl font-bold text-blue-600 mb-4">
                            ${product.price.toLocaleString('es-AR')}
                        </p>
                        
                        {/* 5. El botón ahora NO es un Link, es un BUTTON que agrega al carrito */}
                        <button 
                            onClick={() => addToCart(product)}
                            className="mt-auto w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 active:scale-95 transform duration-150"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Agregar al Carrito
                        </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              // Mensaje sin resultados (Igual que antes)
              <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Sin resultados</h3>
                <button onClick={() => {setSearchTerm(''); setSelectedFilter('Todos');}} className="mt-6 text-blue-600 hover:text-blue-500 font-medium">Limpiar filtros</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;