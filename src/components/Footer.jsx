import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna 1: Info de la marca */}
          <div>
            <h3 className="text-2xl font-bold text-blue-500 mb-4">Bicicletas Coki</h3>
            <p className="text-gray-400 text-sm">
              Tu compañero de confianza en cada kilómetro. Ofrecemos las mejores marcas y un servicio técnico especializado en el corazón de Salta.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition">Catálogo Completo</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Servicio Técnico</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3: Contacto (Datos locales) */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Visítanos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Av. Belgrano 1234, Salta Capital
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +54 3876 036 672
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                contacto@bicicletascoki.com
              </li>
            </ul>
          </div>

        </div>

        {/* Línea divisoria y Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500 flex flex-col items-center">
          <p>&copy; {new Date().getFullYear()} Bicicletas Coki. Todos los derechos reservados.</p>
          
          {/* Enlace discreto al Login */}
          <Link to="/login" className="mt-2 text-gray-700 hover:text-gray-500 text-xs transition">
            Acceso Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;