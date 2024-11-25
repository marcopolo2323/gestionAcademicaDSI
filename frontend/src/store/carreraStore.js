import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const usecarreraStore = create((set) => ({
  carreras: [],

  fetchcarreras: async () => {
    await handleRequest(() => api.get('/carrera'), (data) =>
      set({ carreras: data })
    );
  },

  addCarrera: async (carrera) => {
    return await handleRequest(() => api.post('/carrera', carrera), (data) =>
      set((state) => ({
        carreras: [...state.carreras, data],
      }))
    );
  },

  updateCarrera: async (id, updateData) => {
    return await handleRequest(() => api.put(`/carrera/${id}`, updateData), (data) =>
      set((state) => ({
        carreras: state.carreras.map((carrera) =>
          carrera.id === id ? { ...carrera, ...data } : carrera
        ),
      }))
    );
  },

  deleteCarrera: async (id) => {
    await handleRequest(() => api.delete(`/carrera/${id}`), () =>
      set((state) => ({
        carreras: state.carreras.filter((carrera) => carrera.id !== id),
      }))
    );
  },
}));

export default usecarreraStore;
