import { create } from 'zustand';
import axios from 'axios';

const useUsuarioStore = create((set) => ({
    usuarios: [],
    
    agregarUsuario: async (usuario) => { // método para agregar un usuario
        try {
            const response = await axios.post('http://localhost:3001/usuarios', usuario);
            set((state) => ({ usuarios: [...state.usuarios, response.data] })); // actualizar el estado
        } catch (error) {
            console.log('Error al agregar usuario', error.message);
        }
    },

    obtenerUsuarios: async () => { // método para obtener usuarios
        try {
            const response = await axios.get('http://localhost:3001/usuarios');
            set({ usuarios: response.data });
        } catch (error) {
            console.log('Error al obtener usuarios', error.message);
        }
    },

    eliminarUsuario: async (id) => { // método para eliminar usuario
        try {
            const response = await axios.delete(`http://localhost:3001/usuarios/${id}`); 
            console.log('Usuario eliminado:', response.data);
            set((state) => ({ usuarios: state.usuarios.filter(usuario => usuario.id !== id) }));
        } catch (error) {
            console.log('Error al eliminar usuario', error.message);
        }
    },

    actualizarUsuario: async (id, datosActualizados) => { // método para actualizar usuario
        try {
            const response = await axios.put(`http://localhost:3001/usuarios/${id}`, datosActualizados);
            console.log('Usuario actualizado:', response.data);
            set((state) => ({ usuarios: state.usuarios.map((usuario) => usuario.id === id ? { ...usuario, ...response.data } : usuario) }));
        } catch (error) {
            console.log('Error al actualizar usuario:', error.message);
        }
    }
}));

export default useUsuarioStore;