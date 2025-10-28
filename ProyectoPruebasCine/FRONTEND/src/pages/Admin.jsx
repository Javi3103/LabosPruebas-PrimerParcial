import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import NavbarAdmin from '../components/NavbarAdmin';

const Admin = () => {
    const [user, setUser] = useState([]);
    const { userId } = useAuth();

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/api/users/users/${userId}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener las compras:', error);
                });
        }
    }, [userId]);

    return (
        <div>
            <NavbarAdmin />
            <div className="container" style={{ marginTop: '30px' }}>
                <h1>Hola, bienvenido {user.firstName}</h1>   
                
            </div>
        </div>
    );
        
}

export default Admin