import React from 'react';

const categories = [
  {
    id: 1,
    name: 'Bicicletas',
    description: 'Montaña, Ruta y Urbanas',
    image: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    colSpan: 'col-span-1 md:col-span-2', // Esta ocupará 2 espacios en pantallas medianas
  },
  {
    id: 2,
    name: 'Repuestos',
    description: 'Componentes originales',
    image: 'https://images.unsplash.com/photo-1421429167374-8fc8ab6d0f66?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Foto de engranajes
    colSpan: 'col-span-1',
  },
  {
    id: 3,
    name: 'Accesorios',
    description: 'Cascos, luces y más',
    image: 'https://images.unsplash.com/photo-1611485100985-cb332cd79671?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Foto de casco/accesorios
    colSpan: 'col-span-1',
  },
  {
    id: 4,
    name: 'Indumentaria',
    description: 'Ropa técnica y calzado',
    image: 'https://images.unsplash.com/photo-1605235186583-a8272b61f9fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Foto de ciclista
    colSpan: 'col-span-1 md:col-span-2', // Esta también ocupará 2 espacios para equilibrar
  },
];

const Categories = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Todo para vos y tu bici
        </h2>
        
        {/* Grid estilo "Mosaico" */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className={`relative group rounded-2xl overflow-hidden h-64 cursor-pointer ${category.colSpan}`}
            >
              {/* Imagen de fondo con efecto Zoom al pasar el mouse */}
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Capa oscura para que se lea el texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Texto */}
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {category.description} &rarr;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;