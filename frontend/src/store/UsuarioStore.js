import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const useUsuarioStore = create((set) => ({
  usuarios: [],

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
