import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarClient from '../components/NavbarClient';
import { useAuth } from '../context/AuthContext';

const PersonalInfo = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/users/user/${userId}`)
        .then(response => {
          setUser(response.data);
          setFormData({
            username: response.data.username,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          });
        })
        .catch(error => {
          console.error('Error al obtener la información del usuario:', error);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/api/users/users/${userId}`, formData)
      .then(response => {
        setUser(response.data.user);
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error al actualizar la información del usuario:', error);
      });
  };

  return (
    <div>
      <NavbarClient />
      <div className="container" style={{ marginTop: '30px' }}>
        <h1 className="mb-4">Información Personal</h1>
        <div className="card">
          <div className="card-body">
            {editMode ? (
              <div>
                <div className="mb-3">
                  <label className="form-label">Nombre de Usuario:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-success me-2" onClick={handleSave}>Guardar</button>
                <button className="btn btn-danger" onClick={() => setEditMode(false)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <p><strong>Nombre de Usuario:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Nombre:</strong> {user.firstName}</p>
                <p><strong>Apellido:</strong> {user.lastName}</p>
                <button className="btn btn-warning" onClick={() => setEditMode(true)}>Editar</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;

