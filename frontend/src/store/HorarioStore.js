import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const useHorarioStore = create((set) => ({
  horarios: [], // Initialize as an empty array

  fetchHorarios: async () => { // Remove cicloId parameter
    try {
      const response = await api.get('/horario'); // Fetch all horarios
      set({ horarios: response.data || [] }); // Ensure it's always an array
    } catch (error) {
      console.error('Error fetching horarios:', error);
      set({ horarios: [] }); // Set to empty array on error
    }
  },

  addHorario: async (horarioData) => {
    return await handleRequest(
      () => api.post('/horario', horarioData),
      (data) => set((state) => ({
        horarios: [...state.horarios, data]
      }))
    );
  },

  updateHorario: async (id, updateData) => {
    return await handleRequest(
      () => api.put(`/horario/${id}`, updateData),
      (data) => set((state) => ({
        horarios: state.horarios.map((horario) =>
          horario.id === id ? { ...horario, ...data } : horario
        )
      }))
    );
  },

  deleteHorario: async (id) => {
    await handleRequest(
      () => api.delete(`/horario/${id}`),
      () => set((state) => ({
        horarios: state.horarios.filter((horario) => horario.id !== id)
      }))
    );
  },
}));

export default useHorarioStore;