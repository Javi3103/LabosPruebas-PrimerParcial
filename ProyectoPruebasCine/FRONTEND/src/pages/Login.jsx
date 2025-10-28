import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from './axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/login', {
        emailOrUsername,
        password,
      });
      setMessage('Ingreso exitoso');
      const userRole = res.data.user.role;
      const userId = res.data.user._id;
      login(userRole, userId);
      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/admin'); // Redirige a la página de administrador
        } else {
          navigate('/'); // Redirige a la página de inicio para clientes
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setMessage('Correo o contraseña incorrectos');
      } else {
        setMessage('Ocurrió un error, por favor intente nuevamente');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-dark">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
                {message && (
                  <div className={`alert ${message === 'Ingreso exitoso' ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message}
                  </div>
                )}
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="emailOrUsername" className="form-label">Correo electrónico o Nombre de usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailOrUsername"
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                      placeholder="Ingrese su correo electrónico o nombre de usuario"
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
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-warning w-50">Iniciar sesión</button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <p>¿No tienes una cuenta? <Link to="/register">Registrarse</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
