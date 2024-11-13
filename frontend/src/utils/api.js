import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5000', // Cambia el puerto si es necesario
    headers: {
        'Content-Type': 'application/json',
    },
});


export default api;
