import React, { createContext, useState, useEffect } from 'react';
import axios from '../pages/axios'; // Asegúrate de que la ruta sea correcta

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post('/users/register', user);
      setUsers([...users, response.data.user]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(`/users/users/${id}`, updatedUser);
      setUsers(users.map(user => (user._id === id ? response.data.user : user)));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

