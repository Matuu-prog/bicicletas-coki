import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Estado para controlar si el sidebar se ve en móvil
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* SIDEBAR 
         - En escritorio (md): siempre visible (relative)
         - En móvil: fijo (fixed) sobre el contenido, controlado por el estado
      */}
      <aside 
        className={`bg-gray-900 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'fixed translate-x-0' : 'fixed -translate-x-full'} 
          md:relative md:translate-x-0`}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          
          {/* Botón X para cerrar en móvil */}
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="md:hidden text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-6">
          <a href="#" className="block py-3 px-6 bg-gray-800 border-l-4 border-blue-500">
            Resumen
          </a>
          <a href="#" className="block py-3 px-6 hover:bg-gray-800 transition">
            Productos
          </a>
          <a href="#" className="block py-3 px-6 hover:bg-gray-800 transition">
            Ventas
          </a>
          <Link to="/" className="block py-3 px-6 hover:bg-red-900 text-red-300 mt-10 transition">
            Cerrar Sesión
          </Link>
        </nav>
      </aside>

      {/* FONDO OSCURO (OVERLAY) 
         Solo visible en móvil cuando el menú está abierto, para cerrar al hacer clic afuera
      */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8">
        {/* CABECERA CON BOTÓN DE MENÚ MÓVIL */}
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              {/* Botón Hamburguesa (Solo móvil) */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 rounded-md bg-white shadow text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <h2 className="text-3xl font-bold text-gray-800">Hola, Coki 👋</h2>
            </div>
            
            <Link to="/" className="text-sm text-blue-600 hover:underline hidden sm:block">Ir a la web pública</Link>
        </div>

        {/* Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h3 className="text-gray-500 text-sm font-medium">Productos Activos</h3>
                <p className="text-3xl font-bold text-gray-800">12</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                <h3 className="text-gray-500 text-sm font-medium">Ventas del Mes</h3>
                <p className="text-3xl font-bold text-gray-800">$ 0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                <h3 className="text-gray-500 text-sm font-medium">Mensajes Nuevos</h3>
                <p className="text-3xl font-bold text-gray-800">5</p>
            </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
            <p className="text-gray-400 text-center">Aquí cargaremos la tabla de gestión de productos...</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;