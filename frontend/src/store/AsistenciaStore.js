import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const useAsistenciaStore = create((set) => ({
  asistencias: [],

  fetchAsistencias: async () => {
    await handleRequest(() => api.get('/asistencia'), (data) =>
      set({ asistencias: data })
    );
  },

  addAsistencia: async (asistencia) => {
    return await handleRequest(() => api.post('/asistencia', asistencia), (data) =>
      set((state) => ({
        asistencias: [...state.asistencias, data],
      }))
    );
  },

  updateAsistencia: async (id, updateData) => {
    return await handleRequest(() => api.put(`/asistencia/${id}`, updateData), (data) =>
      set((state) => ({
        asistencias: state.asistencias.map((asistencia) =>
          asistencia.id === id ? { ...asistencia, ...data } : asistencia
        ),
      }))
    );
  },

  deleteAsistencia: async (id) => {
    await handleRequest(() => api.delete(`/asistencia/${id}`), () =>
      set((state) => ({
        asistencias: state.asistencias.filter((asistencia) => asistencia.id !== id),
      }))
    );
  },
}));

export default useAsistenciaStore;
