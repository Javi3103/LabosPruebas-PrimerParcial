import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8001/api', // URL de tu backend Spring Boot
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;