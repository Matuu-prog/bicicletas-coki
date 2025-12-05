import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR SIMPLE */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
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

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Hola, Coki 👋</h2>
            <Link to="/" className="text-sm text-blue-600 hover:underline">Ir a la web pública</Link>
        </div>

        {/* Tarjetas de Resumen (Placeholders) */}
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
            <p className="text-gray-400">Aquí cargaremos la tabla de gestión de productos mañana...</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;