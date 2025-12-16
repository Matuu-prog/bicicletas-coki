import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  // Importamos registerSale del contexto
  const { products, orders, deleteProduct, addProduct, updateProduct, registerSale } = useProducts();
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // PROTECCIÓN DE RUTA
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  const [activeTab, setActiveTab] = useState('products');
  
  // --- ESTADOS PARA PRODUCTOS (CRUD) ---
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // Agregamos 'stock' al formulario
  const initialFormState = { id: null, name: '', description: '', price: '', listPrice: '', category: 'Bicicletas', subcategory: '', image: '', stock: '' };
  const [formData, setFormData] = useState(initialFormState);

  // --- ESTADOS PARA POS (PUNTO DE VENTA) ---
  const [saleCart, setSaleCart] = useState([]);
  const [selectedProductToAdd, setSelectedProductToAdd] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');

  // --- LÓGICA CRUD PRODUCTOS ---
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

  // --- LÓGICA POS (PUNTO DE VENTA) ---
  const addToSaleCart = () => {
    if (!selectedProductToAdd) return;
    
    const product = products.find(p => p.id === parseInt(selectedProductToAdd));
    
    // Validación de Stock
    if (product.stock <= 0) {
        alert("No hay stock disponible de este producto.");
        return;
    }

    const existingItem = saleCart.find(item => item.id === product.id);
    
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            alert("No puedes agregar más unidades de las que tienes en stock.");
            return;
        }
        setSaleCart(saleCart.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    } else {
        setSaleCart([...saleCart, { ...product, quantity: 1 }]);
    }
    setSelectedProductToAdd('');
  };

  const removeFromSaleCart = (id) => {
    setSaleCart(saleCart.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return saleCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const handleFinalizeSale = () => {
    if (saleCart.length === 0) return alert("El carrito está vacío");
    
    const saleData = {
        items: saleCart,
        total: calculateTotal(),
        customer: "Cliente Mostrador",
        paymentMethod: paymentMethod,
        type: "physical_store"
    };

    registerSale(saleData);
    setSaleCart([]);
    alert("¡Venta registrada exitosamente!");
    setActiveTab('orders');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      
      {/* SIDEBAR ORIGINAL (Gris Oscuro) */}
      <aside className="w-full md:w-64 bg-gray-900 text-white md:min-h-screen p-6 shadow-xl z-10 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-white">Bicicletas Coki</h1>
        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('pos')}
            className={`w-full text-left py-2 px-4 rounded transition ${activeTab === 'pos' ? 'bg-blue-600 font-bold' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            🛒 Registrar Venta
          </button>
          <button 
            onClick={() => { setActiveTab('products'); setShowForm(false); }}
            className={`w-full text-left py-2 px-4 rounded transition ${activeTab === 'products' ? 'bg-blue-600 font-bold' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            📦 Productos
          </button>
          <button 
            onClick={() => setActiveTab('stock')}
            className={`w-full text-left py-2 px-4 rounded transition ${activeTab === 'stock' ? 'bg-blue-600 font-bold' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            📊 Stock
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left py-2 px-4 rounded transition ${activeTab === 'orders' ? 'bg-blue-600 font-bold' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            📄 Historial
          </button>
        </nav>
        
        <button 
            onClick={() => { logout(); navigate('/'); }} 
            className="w-full text-left py-2 px-4 hover:bg-red-900 text-red-300 mt-auto transition"
        >
            Cerrar Sesión
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        
        {/* --- PESTAÑA POS (PUNTO DE VENTA) --- */}
        {activeTab === 'pos' && (
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Punto de Venta</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* IZQUIERDA: BUSCADOR Y LISTA */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Selector */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Producto</label>
                            <div className="flex gap-2">
                                <select 
                                    className="flex-1 border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={selectedProductToAdd}
                                    onChange={(e) => setSelectedProductToAdd(e.target.value)}
                                >
                                    <option value="">Buscar en catálogo...</option>
                                    {products.map(p => (
                                        <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                                            {p.name} - ${p.price} (Stock: {p.stock})
                                        </option>
                                    ))}
                                </select>
                                <button 
                                    onClick={addToSaleCart}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
                                >
                                    Agregar
                                </button>
                            </div>
                        </div>

                        {/* Tabla */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden min-h-[300px] border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Cant.</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {saleCart.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                                            <td className="px-6 py-4 text-sm text-center">{item.quantity}</td>
                                            <td className="px-6 py-4 text-sm text-right font-bold text-gray-700">${(item.price * item.quantity).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => removeFromSaleCart(item.id)} className="text-red-500 font-bold hover:text-red-700">X</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {saleCart.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-400 italic">
                                                El carrito está vacío
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* DERECHA: TOTAL Y PAGO */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Resumen de Venta</h3>
                            
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600">Total a Cobrar</span>
                                <span className="text-3xl font-bold text-blue-600">${calculateTotal().toLocaleString()}</span>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pago</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {['Efectivo', 'Posnet / Tarjeta', 'Transferencia'].map(method => (
                                        <button 
                                            key={method}
                                            onClick={() => setPaymentMethod(method)}
                                            className={`py-2 px-3 text-sm rounded border transition ${paymentMethod === method ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {method}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={handleFinalizeSale}
                                className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 shadow transition"
                            >
                                Confirmar Venta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- PESTAÑA STOCK (VISUALIZACIÓN) --- */}
        {activeTab === 'stock' && (
            <div>
                 <h2 className="text-3xl font-bold text-gray-800 mb-6">Estado de Stock</h2>
                 <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stock Real</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 flex items-center">
                                        <img src={p.image} className="h-10 w-10 rounded object-cover mr-3 border" alt="" />
                                        <span className="font-medium text-gray-900">{p.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{p.subcategory || p.category}</td>
                                    <td className="px-6 py-4 text-center">
                                        {p.stock === 0 ? (
                                            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full uppercase">Agotado</span>
                                        ) : p.stock < 5 ? (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full uppercase">Bajo</span>
                                        ) : (
                                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full uppercase">Normal</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-700">
                                        {p.stock}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        )}
        
        {/* --- PESTAÑA PRODUCTOS (CRUD CLÁSICO) --- */}
        {activeTab === 'products' && (
          <>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Gestión de Productos</h2>
                {!showForm && (
                  <button onClick={() => { setFormData(initialFormState); setShowForm(true); }} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 font-medium transition">
                      + Nuevo Producto
                  </button>
                )}
            </div>

            {showForm ? (
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-200">
                    <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input required name="name" placeholder="Nombre del Producto" value={formData.name} onChange={handleChange} className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                        
                        <div>
                            <textarea 
                                required 
                                name="description" 
                                rows="3"
                                placeholder="Descripción..." 
                                value={formData.description} 
                                onChange={handleChange} 
                                className="w-full border p-3 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500">Precio Venta</label>
                                <input required type="number" name="price" placeholder="$" value={formData.price} onChange={handleChange} className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500">Precio Lista</label>
                                <input required type="number" name="listPrice" placeholder="$" value={formData.listPrice} onChange={handleChange} className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            {/* NUEVO CAMPO: STOCK EN EL FORMULARIO */}
                            <div>
                                <label className="text-xs font-bold text-green-600">Stock Inicial</label>
                                <input required type="number" name="stock" placeholder="Cant." value={formData.stock} onChange={handleChange} className="w-full border border-green-200 p-3 rounded focus:ring-2 focus:ring-green-500 outline-none bg-green-50" />
                            </div>
                        </div>

                        <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-3 rounded bg-white">
                            <option>Bicicletas</option>
                            <option>Accesorios</option>
                            <option>Indumentaria</option>
                            <option>Repuestos</option>
                        </select>
                        <input name="subcategory" placeholder="Subcategoría (ej: Montaña)" value={formData.subcategory} onChange={handleChange} className="w-full border p-3 rounded" />
                        
                        <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center hover:bg-gray-50 transition cursor-pointer">
                             <input type="file" onChange={handleImageChange} className="w-full text-sm text-gray-500" />
                             {formData.image && <img src={formData.image} alt="Preview" className="mx-auto mt-4 h-32 object-contain" />}
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded hover:bg-gray-50 text-gray-700">Cancelar</button>
                            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">Guardar</button>
                        </div>
                    </form>
                </div>
            ) : (
                // Tabla Productos
                <div className="bg-white rounded shadow overflow-hidden hidden md:block border border-gray-200">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stock</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                             {products.map(p => (
                                 <tr key={p.id} className="hover:bg-gray-50">
                                     <td className="px-6 py-4 flex items-center">
                                         <img src={p.image} className="h-10 w-10 rounded object-cover mr-3 border" alt="" />
                                         <div>
                                            <div className="font-medium text-gray-900">{p.name}</div>
                                            <div className="text-gray-500 text-xs">{p.subcategory}</div>
                                         </div>
                                     </td>
                                     <td className="px-6 py-4 text-green-600 font-bold">${p.price?.toLocaleString()}</td>
                                     <td className="px-6 py-4 text-right font-medium">{p.stock}</td>
                                     <td className="px-6 py-4 text-right">
                                         <button onClick={() => handleEdit(p)} className="text-indigo-600 font-medium mr-3 hover:text-indigo-900">Editar</button>
                                         <button onClick={() => deleteProduct(p.id)} className="text-red-600 font-medium hover:text-red-900">Borrar</button>
                                     </td>
                                 </tr>
                             ))}
                        </tbody>
                     </table>
                </div>
            )}
          </>
        )}

        {/* --- PESTAÑA HISTORIAL (VISUALIZACIÓN) --- */}
        {activeTab === 'orders' && (
            <div>
                 <h2 className="text-3xl font-bold text-gray-800 mb-6">Historial de Movimientos</h2>
                 <div className="space-y-4">
                    {orders.length === 0 ? (
                        <p className="text-gray-500 italic">No hay registros aún.</p>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className={`bg-white p-4 rounded border-l-4 shadow-sm hover:shadow-md transition ${order.type === 'physical_store' ? 'border-blue-500' : 'border-purple-500'}`}>
                                <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-2 mb-2">
                                    <div>
                                        <span className="font-bold text-gray-700">#{order.id}</span>
                                        <span className="mx-2 text-gray-400">|</span>
                                        <span className="text-gray-900 font-medium">{order.customer}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">{order.date}</div>
                                </div>
                                
                                <div className="flex justify-between items-end">
                                    <div className="text-sm text-gray-600">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs text-white uppercase font-bold mr-2 ${order.type === 'physical_store' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                                            {order.type === 'physical_store' ? 'Local' : 'Web'}
                                        </span>
                                        Pago: <span className="font-medium">{order.paymentMethod}</span>
                                    </div>
                                    <div className="text-right text-xl font-bold text-gray-800">
                                        ${order.total?.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                 </div>
            </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;