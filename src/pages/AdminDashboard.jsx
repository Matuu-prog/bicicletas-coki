import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
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
    // Scroll suave hacia el formulario si está en móvil
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- LÓGICA POS ---
  const addToSaleCart = () => {
    if (!selectedProductToAdd) return;
    
    const product = products.find(p => p.id === parseInt(selectedProductToAdd));
    
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
      
      {/* SIDEBAR RESPONSIVO */}
      <aside className="w-full md:w-64 bg-gray-900 text-white md:min-h-screen p-4 md:p-6 shadow-xl z-10 flex flex-col">
        <div className="flex justify-between items-center mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-white">Bicicletas Coki</h1>
            {/* Indicador móvil */}
            <span className="md:hidden text-xs bg-blue-600 px-2 py-1 rounded">ADMIN</span>
        </div>
        
        {/* Menú de navegación flexible para móvil */}
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          <button onClick={() => setActiveTab('pos')} className={`whitespace-nowrap flex-1 md:flex-none text-left py-2 px-3 md:px-4 rounded transition text-sm md:text-base ${activeTab === 'pos' ? 'bg-blue-600 font-bold' : 'bg-gray-800 md:bg-transparent hover:bg-gray-800 text-gray-300'}`}>
            🛒 <span className="hidden md:inline">Registrar</span> Venta
          </button>
          <button onClick={() => { setActiveTab('products'); setShowForm(false); }} className={`whitespace-nowrap flex-1 md:flex-none text-left py-2 px-3 md:px-4 rounded transition text-sm md:text-base ${activeTab === 'products' ? 'bg-blue-600 font-bold' : 'bg-gray-800 md:bg-transparent hover:bg-gray-800 text-gray-300'}`}>
            📦 Productos
          </button>
          <button onClick={() => setActiveTab('stock')} className={`whitespace-nowrap flex-1 md:flex-none text-left py-2 px-3 md:px-4 rounded transition text-sm md:text-base ${activeTab === 'stock' ? 'bg-blue-600 font-bold' : 'bg-gray-800 md:bg-transparent hover:bg-gray-800 text-gray-300'}`}>
            📊 Stock
          </button>
          <button onClick={() => setActiveTab('orders')} className={`whitespace-nowrap flex-1 md:flex-none text-left py-2 px-3 md:px-4 rounded transition text-sm md:text-base ${activeTab === 'orders' ? 'bg-blue-600 font-bold' : 'bg-gray-800 md:bg-transparent hover:bg-gray-800 text-gray-300'}`}>
            📄 Historial
          </button>
        </nav>
        
        <button onClick={() => { logout(); navigate('/'); }} className="hidden md:block w-full text-left py-2 px-4 hover:bg-red-900 text-red-300 mt-auto transition">
            Cerrar Sesión
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        
        {/* --- PESTAÑA POS --- */}
        {activeTab === 'pos' && (
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Punto de Venta</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Producto</label>
                            <div className="flex flex-col md:flex-row gap-2">
                                <select 
                                    className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    value={selectedProductToAdd}
                                    onChange={(e) => setSelectedProductToAdd(e.target.value)}
                                >
                                    <option value="">Buscar en catálogo...</option>
                                    {products.map(p => (
                                        <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                                            {p.name} - ${p.price} ({p.stock} disp.)
                                        </option>
                                    ))}
                                </select>
                                <button onClick={addToSaleCart} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-medium w-full md:w-auto">
                                    Agregar
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                             {/* Tabla responsiva para items */}
                             <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prod.</th>
                                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Cant.</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">$$</th>
                                            <th className="px-4 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {saleCart.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                                                <td className="px-4 py-4 text-sm text-center">{item.quantity}</td>
                                                <td className="px-4 py-4 text-sm text-right font-bold">${(item.price * item.quantity).toLocaleString()}</td>
                                                <td className="px-4 py-4 text-right">
                                                    <button onClick={() => removeFromSaleCart(item.id)} className="text-red-500 font-bold px-2">X</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {saleCart.length === 0 && <p className="p-8 text-center text-gray-400 italic">Carrito vacío</p>}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 h-fit">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Total</h3>
                        <div className="text-3xl font-bold text-blue-600 mb-6 text-center">${calculateTotal().toLocaleString()}</div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">Pago</label>
                        <div className="grid grid-cols-1 gap-2 mb-6">
                            {['Efectivo', 'Posnet', 'Transf.'].map(method => (
                                <button key={method} onClick={() => setPaymentMethod(method)} className={`py-2 px-3 text-sm rounded border transition ${paymentMethod === method ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold' : 'border-gray-300'}`}>
                                    {method}
                                </button>
                            ))}
                        </div>

                        <button onClick={handleFinalizeSale} className="w-full bg-green-600 text-white py-4 rounded font-bold hover:bg-green-700 shadow text-lg">
                            COBRAR
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* --- PESTAÑA STOCK (OPTIMIZADA MÓVIL) --- */}
        {activeTab === 'stock' && (
            <div>
                 <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Estado de Stock</h2>
                 <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                    {/* ENVOLTORIO PARA SCROLL HORIZONTAL */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categ.</th>
                                    <th className="px-4 md:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                                    <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stock</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50">
                                        <td className="px-4 md:px-6 py-4 flex items-center">
                                            <img src={p.image} className="h-8 w-8 md:h-10 md:w-10 rounded object-cover mr-3 border" alt="" />
                                            <span className="font-medium text-gray-900 text-sm md:text-base truncate max-w-[150px]">{p.name}</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{p.subcategory}</td>
                                        <td className="px-4 md:px-6 py-4 text-center">
                                            {p.stock === 0 ? <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded uppercase font-bold">Agotado</span> : 
                                             p.stock < 5 ? <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded uppercase font-bold">Bajo</span> : 
                                             <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded uppercase font-bold">OK</span>}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right font-bold text-gray-700">{p.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
        )}
        
        {/* --- PESTAÑA PRODUCTOS (SOLUCIÓN MÓVIL) --- */}
        {activeTab === 'products' && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión Productos</h2>
                {!showForm && (
                  <button onClick={() => { setFormData(initialFormState); setShowForm(true); }} className="w-full md:w-auto bg-green-600 text-white px-4 py-3 rounded shadow hover:bg-green-700 font-medium">
                      + Nuevo Producto
                  </button>
                )}
            </div>

            {showForm ? (
                <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-200">
                    <h3 className="text-xl font-bold mb-6 text-center text-gray-800">{isEditing ? 'Editar' : 'Crear'} Producto</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input required name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} className="w-full border p-3 rounded outline-none focus:ring-2 focus:ring-blue-500" />
                        <textarea required name="description" rows="3" placeholder="Descripción..." value={formData.description} onChange={handleChange} className="w-full border p-3 rounded outline-none resize-none" />
                        
                        <div className="grid grid-cols-2 gap-3">
                            <input required type="number" name="price" placeholder="$ Venta" value={formData.price} onChange={handleChange} className="border p-3 rounded w-full" />
                            <input required type="number" name="listPrice" placeholder="$ Lista" value={formData.listPrice} onChange={handleChange} className="border p-3 rounded w-full" />
                        </div>
                        <input required type="number" name="stock" placeholder="Stock Inicial" value={formData.stock} onChange={handleChange} className="border border-green-300 bg-green-50 p-3 rounded w-full font-bold text-green-800" />
                        
                        <div className="grid grid-cols-2 gap-3">
                            <select name="category" value={formData.category} onChange={handleChange} className="border p-3 rounded bg-white w-full">
                                <option>Bicicletas</option>
                                <option>Accesorios</option>
                                <option>Indumentaria</option>
                                <option>Repuestos</option>
                            </select>
                            <input name="subcategory" placeholder="Subcat." value={formData.subcategory} onChange={handleChange} className="border p-3 rounded w-full" />
                        </div>

                        <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                             <input type="file" onChange={handleImageChange} className="w-full text-sm text-gray-500" />
                             {formData.image && <img src={formData.image} alt="Preview" className="mx-auto mt-4 h-24 object-contain" />}
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 border rounded text-gray-700">Cancelar</button>
                            <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded font-bold">Guardar</button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    {/* VISTA PC (TABLA) */}
                    <div className="hidden md:block bg-white rounded shadow overflow-hidden border border-gray-200">
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
                                             <div className="truncate max-w-[200px] font-medium text-gray-900">{p.name}</div>
                                         </td>
                                         <td className="px-6 py-4 text-green-600 font-bold">${p.price?.toLocaleString()}</td>
                                         <td className="px-6 py-4 text-right">{p.stock}</td>
                                         <td className="px-6 py-4 text-right">
                                             <button onClick={() => handleEdit(p)} className="text-indigo-600 font-medium mr-3">Editar</button>
                                             <button onClick={() => deleteProduct(p.id)} className="text-red-600 font-medium">Borrar</button>
                                         </td>
                                     </tr>
                                 ))}
                            </tbody>
                         </table>
                    </div>

                    {/* VISTA MÓVIL (TARJETAS) - ¡ESTO ARREGLA QUE NO VEÍAS NADA! */}
                    <div className="md:hidden grid grid-cols-1 gap-4">
                        {products.map(p => (
                            <div key={p.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 flex gap-4">
                                <img src={p.image} className="h-20 w-20 rounded object-cover border bg-gray-50" alt="" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{p.name}</h4>
                                    <p className="text-xs text-gray-500 mb-1">{p.category}</p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-green-600 font-bold">${p.price?.toLocaleString()}</p>
                                            <p className="text-xs text-gray-500">Stock: {p.stock}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button onClick={() => handleEdit(p)} className="text-indigo-600 font-bold text-sm">Editar</button>
                                            <button onClick={() => deleteProduct(p.id)} className="text-red-600 font-bold text-sm">X</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
          </>
        )}

        {/* --- PESTAÑA HISTORIAL (OPTIMIZADA) --- */}
        {activeTab === 'orders' && (
            <div>
                 <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Historial Ventas</h2>
                 <div className="space-y-4">
                    {orders.length === 0 ? (
                        <p className="text-gray-500 italic text-center py-8">No hay registros aún.</p>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className={`bg-white p-4 rounded border-l-4 shadow-sm ${order.type === 'physical_store' ? 'border-blue-500' : 'border-purple-500'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="font-bold text-gray-800 text-sm md:text-base">#{order.id}</div>
                                        <div className="text-xs text-gray-500">{order.date}</div>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-[10px] md:text-xs text-white uppercase font-bold ${order.type === 'physical_store' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                                        {order.type === 'physical_store' ? 'Local' : 'Web'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-2 border-t pt-2">
                                    <span className="text-sm text-gray-600">{order.paymentMethod}</span>
                                    <span className="text-lg font-bold text-gray-900">${order.total?.toLocaleString()}</span>
                                </div>
                            </div>
                        ))
                    )}
                 </div>
            </div>
        )}

        <button onClick={() => { logout(); navigate('/'); }} className="md:hidden w-full mt-8 py-3 bg-red-50 text-red-600 font-bold rounded border border-red-100">
            Cerrar Sesión
        </button>

      </main>
    </div>
  );
};

export default AdminDashboard;