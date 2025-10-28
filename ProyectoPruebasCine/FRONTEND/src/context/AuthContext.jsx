
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || 'client';
  });

  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId') || '';
  });

  const login = (role, userId) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setUserRole(role);
    localStorage.setItem('userRole', role);
    setUserId(userId);
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    setUserRole('client');
    localStorage.removeItem('userRole');
    setUserId('');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//Validación de props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
