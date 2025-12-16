import React from 'react';
import { Link } from 'react-router-dom';

const HeroFull = () => {
  // URL de una imagen de montaña impactante
  const bgImage = "https://images.unsplash.com/photo-1640314187544-448b80927f86?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    // 1. Contenedor principal
    <div 
      className="relative bg-cover bg-center h-[80vh] flex items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 2. Capa oscura superpuesta (Overlay) */}
        <div className="absolute inset-0 bg-black/50"></div>

      {/* 3. Contenido de texto centrado */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block">Domina cualquier camino</span>
          <span className="block text-blue-400">Tu bici ideal está en Coki</span>
        </h1>
        
        <p className="mt-3 max-w-md mx-auto text-lg text-gray-200 sm:text-xl md:mt-5 md:max-w-3xl">
          Las mejores bicicletas de montaña, ruta y urbanas en Salta. Prepárate para tu próxima aventura con equipamiento profesional.
        </p>
        
        <div className="mt-10 flex justify-center gap-4 font-medium">
          {/* Botón Principal */}
          <Link
            to="/catalogo"
            className="px-8 py-3 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition shadow-lg"
          >
            Ver Catálogo
          </Link>
          
          {/* Botón Secundario (WhatsApp / Asesoramiento) */}
          <a
            // AQUÍ ESTÁ EL CAMBIO: Número actualizado con formato internacional (549...)
            href="https://wa.me/5493876036672?text=Hola!%20Necesito%20asesoramiento%20para%20elegir%20mi%20bici."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-white rounded-md text-white hover:bg-white hover:text-gray-900 md:py-4 md:text-lg md:px-10 transition shadow-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Asesoramiento
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroFull;