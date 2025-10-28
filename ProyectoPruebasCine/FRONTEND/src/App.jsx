import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // Asegúrate de actualizar la ruta según la estructura de tu proyecto
import { UserProvider } from './context/UserContext.jsx'; // Asegúrate de actualizar la ruta según la estructura de tu proyecto

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Cartelera from './pages/Cartelera.jsx';
import Comprar from './pages/Comprar.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Pagar from './pages/Pagar.jsx';
import Admin from './pages/Admin.jsx';
import Users from './pages/Users.jsx';
import Buys from './pages/Buys.jsx';
import Profile from './pages/Profile.jsx';
import BuysClient from './pages/BuysClient.jsx';
import PersonalInfo from './pages/PersonalInfo.jsx';
import PayInfo from './pages/PayInfo.jsx';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cartelera" element={<Cartelera />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/comprar/:id" element={<Comprar />} />
            <Route path="/pagar" element={<Pagar />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/users" element={<Users />} />
            <Route path="/buys" element={<Buys />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/buysclient" element={<BuysClient />} />
            <Route path="/personalinfo" element={<PersonalInfo />} />
            <Route path="/payinfo" element={<PayInfo />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
