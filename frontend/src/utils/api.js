import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const handleRequest = async (request, onSuccess) => {
  try {
    const response = await request();
    
    // Log de respuesta exitosa para debugging
    console.log('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });

    if (onSuccess) {
      onSuccess(response.data);
    }
    return response.data;
  } catch (error) {
    // Log detallado del error
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });

    // Manejar diferentes tipos de errores
    if (error.response) {
      // El servidor respondió con un status code fuera del rango 2xx
      throw new Error(error.response.data.message || 'Error en la respuesta del servidor');
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Algo sucedió en la configuración de la petición
      throw new Error('Error al realizar la petición');
    }
  }
};