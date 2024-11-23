import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const useHorarioStore = create((set) => ({
  horarios: [],

  fetchHorarios: async () => {
    await handleRequest(() => api.get('/horario'), (data) =>
      set({ horarios: data })
    );
  },

  addHorario: async (horario) => {
    return await handleRequest(() => api.post('/horario', horario), (data) =>
      set((state) => ({
        horarios: [...state.horarios, data],
      }))
    );
  },

  updateHorario: async (id, updateData) => {
    return await handleRequest(() => api.put(`/horario/${id}`, updateData), (data) =>
      set((state) => ({
        horarios: state.horarios.map((horario) =>
          horario.id === id ? { ...horario, ...data } : horario
        ),
      }))
    );
  },

  deleteHorario: async (id) => {
    await handleRequest(() => api.delete(`/horario/${id}`), () =>
      set((state) => ({
        horarios: state.horarios.filter((horario) => horario.id !== id),
      }))
    );
  },
}));

export default useHorarioStore;