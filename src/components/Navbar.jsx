import React, { useState } from 'react'; // <--- Importamos useState
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const { isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Bicicletas Coki
            </Link>
          </div>
          
          {/* MENU DE ESCRITORIO (Hidden en móvil) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Inicio</Link>
            <Link to="/catalogo" className="text-gray-700 hover:text-blue-600 font-medium">Catálogo</Link>
            
            {isAdmin && (
              <Link to="/admin" className="text-blue-600 font-bold hover:text-blue-800 border-2 border-blue-600 px-3 py-1 rounded-md">
                Panel Admin
              </Link>
            )}


            {/* Botón Carrito Escritorio */}
            <Link to="/carrito" className="relative text-gray-700 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* BOTÓN HAMBURGUESA (Visible solo en móvil) */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  // Icono de X (Cerrar)
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Icono de Hamburguesa (Abrir)
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)} // Cierra el menú al hacer click
            >
              Inicio
            </Link>
            <Link 
              to="/catalogo" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Catálogo
            </Link>

             {isAdmin && (
              <Link to="/admin" className="text-blue-600 font-bold hover:text-blue-800 border-2 border-blue-600 px-3 py-1 rounded-md">
                Panel Admin
              </Link>
            )}
            
            {/* Enlace al Carrito Móvil con contador escrito */}
            <Link 
              to="/carrito" 
              className="block px-3 py-2 rounded-md text-base font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 flex justify-between items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Ver mi Carrito</span>
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartCount} items
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;