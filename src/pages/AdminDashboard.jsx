import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { products, orders, deleteProduct, addProduct, updateProduct } = useProducts();
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // PROTECCIÓN DE RUTA
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  const [activeTab, setActiveTab] = useState('products');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const initialFormState = { id: null, name: '', description: '', price: '', listPrice: '', category: 'Bicicletas', subcategory: '', image: '' };
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, image: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) updateProduct(formData);
    else addProduct(formData);
    setFormData(initialFormState);
    setShowForm(false);
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-gray-900 text-white md:min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="space-y-2">
          <button 
            onClick={() => { setActiveTab('products'); setShowForm(false); }}
            className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'products' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            Productos
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`block w-full text-left py-2 px-4 rounded ${activeTab === 'orders' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            Historial de Ventas
          </button>
          <button 
            onClick={() => { logout(); navigate('/'); }} 
            className="block w-full text-left py-2 px-4 hover:bg-red-900 text-red-300 mt-8"
          >
            Cerrar Sesión
          </button>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* VISTA DE PRODUCTOS */}
        {activeTab === 'products' && (
          <>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Productos</h2>
                {!showForm && (
                  <button onClick={() => { setFormData(initialFormState); setShowForm(true); }} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
                      + Nuevo Producto
                  </button>
                )}
            </div>

            {showForm ? (
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-200">
                    <h3 className="text-2xl font-bold mb-6 text-center">{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input required name="name" placeholder="Nombre del Producto" value={formData.name} onChange={handleChange} className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">Descripción Detallada</label>
                            <textarea 
                                required 
                                name="description" 
                                rows="4"
                                placeholder="Describe el producto..." 
                                value={formData.description} 
                                onChange={handleChange} 
                                className="w-full border p-3 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 font-bold">Precio Contado</label>
                                <input required type="number" name="price" placeholder="$ Contado" value={formData.price} onChange={handleChange} className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-bold">Precio Lista</label>
                                <input required type="number" name="listPrice" placeholder="$ Lista" value={formData.listPrice} onChange={handleChange} className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>

                        <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-3 rounded bg-white">
                            <option>Bicicletas</option>
                            <option>Accesorios</option>
                            <option>Indumentaria</option>
                            <option>Repuestos</option>
                        </select>
                        <input name="subcategory" placeholder="Subcategoría (ej: Montaña)" value={formData.subcategory} onChange={handleChange} className="w-full border p-3 rounded" />
                        
                        <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                             <input type="file" onChange={handleImageChange} className="w-full" />
                             {formData.image && <img src={formData.image} alt="Preview" className="mx-auto mt-4 h-32 object-contain" />}
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded hover:bg-gray-50 text-gray-700">Cancelar</button>
                            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">Guardar Producto</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precios</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td className="px-6 py-4 flex items-center">
                                        <img src={p.image} className="h-10 w-10 rounded-full object-cover mr-3" alt="" />
                                        <div>
                                            <div className="font-medium text-gray-900">{p.name}</div>
                                            <div className="text-gray-500 text-xs">{p.subcategory}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="text-green-600 font-bold">${p.price?.toLocaleString()}</div>
                                        <div className="text-gray-500 text-xs mt-1">Lista: ${p.listPrice?.toLocaleString()}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(p)} className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                                        <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:text-red-900">Borrar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
          </>
        )}

        {/* VISTA DE HISTORIAL DE VENTAS (AHORA SÍ COMPLETA) */}
        {activeTab === 'orders' && (
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Historial de Ventas Simuladas</h2>
                {orders.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-lg shadow">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-gray-500 text-lg">Aún no hay ventas registradas.</p>
                        <p className="text-gray-400 text-sm mt-2">Prueba realizar una compra en el sitio como si fueras un cliente.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition">
                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 border-b pb-2">
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-800">Orden #{order.id}</h3>
                                        <p className="text-sm text-gray-500">{order.date}</p>
                                    </div>
                                    <div className="mt-2 md:mt-0">
                                         <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">Pagado</span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Lista de Items */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Productos</h4>
                                        <ul className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="flex justify-between text-sm text-gray-700">
                                                    <span>{item.quantity}x {item.name}</span>
                                                    <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    {/* Resumen */}
                                    <div className="flex flex-col justify-center items-end">
                                        <p className="text-sm text-gray-600">Cliente: <span className="font-semibold text-gray-900">{order.customer}</span></p>
                                        <p className="text-2xl font-bold text-blue-600 mt-2">
                                            Total: ${order.total.toLocaleString('es-AR')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;