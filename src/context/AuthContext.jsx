import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // 1. INICIALIZACIÓN: Leemos de localStorage antes de definir el estado
  const [isAdmin, setIsAdmin] = useState(() => {
    const savedSession = localStorage.getItem('isAdmin');
    return savedSession === 'true'; // Si dice "true", arranca logueado
  });

  const login = () => {
    // 2. Al loguear, guardamos en el navegador
    localStorage.setItem('isAdmin', 'true');
    setIsAdmin(true);
  };

  const logout = () => {
    // 3. Al salir, borramos del navegador
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};