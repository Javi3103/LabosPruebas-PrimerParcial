import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from './axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role: 'client', // Asegura que el rol se está enviando
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message || 'Ocurrió un error, por favor intente nuevamente');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <div className="card border-dark">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Registro</h2>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Ingrese su nombre"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Ingrese su apellido"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ingrese su nombre de usuario"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingrese su correo electrónico"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingrese su contraseña"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirme su contraseña"
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-warning w-50">Registrarse</button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
