import React, { createContext, useState, useContext, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  // 1. CARGAR PRODUCTOS: Intentamos leer de localStorage primero
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
    // Si no hay nada guardado, usamos los iniciales y agregamos los campos extra
    return initialProducts.map(p => ({
      ...p,
      listPrice: p.listPrice || Math.round(p.price * 1.15),
      price: p.price,
      description: p.description || "Descripción detallada del producto. Ideal para tus aventuras en Salta con garantía oficial de Bicicletas Coki."
    }));
  });

  // 2. CARGAR ORDENES: Intentamos leer de localStorage
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // 3. EFECTO: Guardar en localStorage cada vez que cambien los PRODUCTOS
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // 4. EFECTO: Guardar en localStorage cada vez que cambien las ORDENES
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);


  // --- FUNCIONES (Igual que antes) ---
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const addProduct = (newProduct) => {
    const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productWithNumbers = {
        ...newProduct,
        id,
        price: parseFloat(newProduct.price),
        listPrice: parseFloat(newProduct.listPrice)
    };
    setProducts([...products, productWithNumbers]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const addOrder = (orderData) => {
    const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        ...orderData
    };
    setOrders([newOrder, ...orders]);
  };

  return (
    <ProductContext.Provider value={{ products, orders, deleteProduct, addProduct, updateProduct, addOrder }}>
      {children}
    </ProductContext.Provider>
  );
};