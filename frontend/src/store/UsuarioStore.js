import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const useUsuarioStore = create((set) => ({
  usuarios: [],
  roles: [],

  fetchRoles: async () => {
    try {
      const response = await api.get('/roles');
      console.log('Respuesta de roles:', response.data);
      set({ roles: response.data });
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  },

  fetchUsuarios: async () => {
    await handleRequest(() => api.get('/usuario'), (data) =>
      set({ usuarios: data })
    );
  },

  addUsuario: async (usuario) => {
    return await handleRequest(() => api.post('/usuario', usuario), (data) =>
      set((state) => ({
        usuarios: [...state.usuarios, data],
      }))
    );
  },

  updateUsuario: async (id, updateData) => { 
    return await handleRequest(() => api.put(`/usuario/${id}`, updateData), (data) =>
      set((state) => ({
        usuarios: state.usuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, ...data } : usuario
        ),
      }))
    );
  },

  deleteUsuario: async (id) => {
    await handleRequest(() => api.delete(`/usuario/${id}`), () =>
      set((state) => ({
        usuarios: state.usuarios.filter((usuario) => usuario.id !== id),
      }))
    );
  },
}));

export default useUsuarioStore;
