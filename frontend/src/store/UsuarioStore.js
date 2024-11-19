import { create } from 'zustand';
import axios from 'axios';

const useUsuarioStore = create((set) => ({
    usuarios: [],
    
    agregarUsuario: async (usuario) => {
        try {
            const response = await axios.post('http://localhost:3001/usuarios', usuario);
            set((state) => ({ usuarios: [...state.usuarios, response.data] }));
            return response.data; // Importante: retornar los datos para usarlos en el registro
        } catch (error) {
            console.log('Error al agregar usuario', error.message);
            throw error; // Lanzar el error para manejarlo en el componente
        }
    },

    obtenerUsuarios: async () => {
        try {
            const response = await axios.get('http://localhost:3001/usuarios');
            set({ usuarios: response.data });
            return response.data;
        } catch (error) {
            console.log('Error al obtener usuarios', error.message);
            throw error;
        }
    },

    eliminarUsuario: async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/usuarios/${id}`);
            set((state) => ({ 
                usuarios: state.usuarios.filter(usuario => usuario.id !== id) 
            }));
            return response.data;
        } catch (error) {
            console.log('Error al eliminar usuario', error.message);
            throw error;
        }
    },

    actualizarUsuario: async (id, datosActualizados) => {
        try {
            const response = await axios.put(`http://localhost:3001/usuarios/${id}`, datosActualizados);
            set((state) => ({ 
                usuarios: state.usuarios.map((usuario) => 
                    usuario.id === id ? { ...usuario, ...response.data } : usuario
                ) 
            }));
            return response.data;
        } catch (error) {
            console.log('Error al actualizar usuario:', error.message);
            throw error;
        }
    }
}));

export default useUsuarioStore;