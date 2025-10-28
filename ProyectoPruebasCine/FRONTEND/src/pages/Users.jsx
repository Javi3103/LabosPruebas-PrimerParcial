import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import NavbarAdmin from '../components/NavbarAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
  const { users, addUser, updateUser, deleteUser } = useContext(UserContext);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'client',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      if (editingUser) {
        await updateUser(editingUser._id, form);
        setMessage('Usuario actualizado correctamente');
      } else {
        await addUser(form);
        setMessage('Usuario agregado correctamente');
      }
      setForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        role: 'client',
      });

      setEditingUser(null);
    } catch (err) {
      setMessage('Error al procesar la solicitud');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({ ...user, password: '', confirmPassword: '' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setMessage('Usuario eliminado correctamente');
    } catch (err) {
      setMessage('Error al eliminar el usuario');
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="container" style={{ marginTop: '25px' }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="mb-4 text-center">Gestión de Usuarios</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title text-center">{editingUser ? 'Actualizar Usuario' : 'Agregar Usuario'}</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleInputChange}
                      placeholder="Nombre"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleInputChange}
                      placeholder="Apellido"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Nombre de usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={form.username}
                      onChange={handleInputChange}
                      placeholder="Nombre de usuario"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Correo electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="Correo electrónico"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={form.password}
                      onChange={handleInputChange}
                      placeholder="Contraseña"
                      required={!editingUser}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Confirmar Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirmar Contraseña"
                      required={!editingUser}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Rol</label>
                    <select
                      className="form-control"
                      name="role"
                      value={form.role}
                      onChange={handleInputChange}
                    >
                      <option value="client">Cliente</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-warning w-100">
                    {editingUser ? 'Actualizar' : 'Agregar'}
                  </button>
                </form>
              </div>
            </div>
            <ul className="list-group mb-4">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    {user.firstName} {user.lastName} - {user.username} -{' '}
                    {user.email} - {user.role}
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-m me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-m"
                      onClick={() => handleDelete(user._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

