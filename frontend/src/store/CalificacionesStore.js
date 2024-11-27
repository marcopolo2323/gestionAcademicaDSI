import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const usecalificacionestore = create((set) => ({
  calificaciones: [],

  fetchCalificaciones: async () => {
    await handleRequest(() => api.get('/calificacion'), (data) =>
      set({ calificaciones: data })
    );
  },

  addCalificaciones: async (calificaciones) => {
    return await handleRequest(
      () => api.post('/calificacion', calificaciones),
      (data) =>
        set((state) => ({
          calificaciones: [...state.calificaciones, data],
        }))
    );
  },
  

  updateCalificaciones: async (id, updateData) => {
    return await handleRequest(() => api.put(`/calificacion/${id}`, updateData), (data) =>
      set((state) => ({
        calificaciones: state.calificaciones.map((calificaciones) =>
          calificaciones.id === id ? { ...calificaciones, ...data } : calificaciones
        ),
      }))
    );
  },

  deleteCalificaciones: async (id) => {
    await handleRequest(() => api.delete(`/calificacion/${id}`), () =>
      set((state) => ({
        calificaciones: state.calificaciones.filter((calificaciones) => calificaciones.id !== id),
      }))
    );
  },
}));

export default usecalificacionestore;
