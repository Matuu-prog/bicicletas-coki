import React, { createContext, useState, useContext, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  // 1. CARGAR PRODUCTOS
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    let productsList = [];

    if (savedProducts) {
      productsList = JSON.parse(savedProducts);
    } else {
      productsList = initialProducts;
    }

    // MAPEO DE SEGURIDAD:
    // Aseguramos que todos los productos tengan los campos nuevos (incluido STOCK)
    // Si ya existen en memoria pero no tienen stock, les ponemos 10 por defecto.
    return productsList.map(p => ({
      ...p,
      listPrice: p.listPrice || Math.round(p.price * 1.15),
      price: p.price,
      description: p.description || "Descripción detallada del producto. Ideal para tus aventuras en Salta con garantía oficial de Bicicletas Coki.",
      stock: p.stock !== undefined ? p.stock : 10 // <--- NUEVO: Stock por defecto
    }));
  });

  // 2. CARGAR ORDENES
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // 3. EFECTOS DE GUARDADO
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);


  // --- FUNCIONES ---

  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const addProduct = (newProduct) => {
    const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productWithNumbers = {
        ...newProduct,
        id,
        price: parseFloat(newProduct.price),
        listPrice: parseFloat(newProduct.listPrice),
        stock: parseInt(newProduct.stock || 0) // <--- NUEVO: Guardar Stock
    };
    setProducts([...products, productWithNumbers]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  // --- NUEVA FUNCIÓN: REGISTRAR VENTA (PARA EL POS) ---
  const registerSale = (saleData) => {
    // 1. Guardar la orden en el historial
    const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        ...saleData // Trae items, total, metodo de pago, cliente
    };
    // Agregamos la nueva orden al principio de la lista
    setOrders([newOrder, ...orders]);

    // 2. Descontar Stock automáticamente
    const updatedProducts = products.map(product => {
        // Buscamos si este producto del inventario está en la lista de items vendidos
        const itemSold = saleData.items.find(item => item.id === product.id);
        
        if (itemSold) {
            // Si se vendió, restamos la cantidad
            // Math.max(0, ...) evita que quede stock negativo
            return { ...product, stock: Math.max(0, product.stock - itemSold.quantity) };
        }
        return product;
    });
    
    setProducts(updatedProducts);
  };

  // Mantenemos addOrder como un "alias" de registerSale para compatibilidad
  const addOrder = (orderData) => registerSale(orderData);

  return (
    <ProductContext.Provider value={{ products, orders, deleteProduct, addProduct, updateProduct, addOrder, registerSale }}>
      {children}
    </ProductContext.Provider>
  );
};