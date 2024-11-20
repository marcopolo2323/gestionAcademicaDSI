import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const useCursoStore = create((set) => ({
  cursos: [],

  fetchCursos: async () => {
    await handleRequest(() => api.get('/curso'), (data) =>
      set({ cursos: data })
    );
  },

  addCurso: async (curso) => {
    return await handleRequest(() => api.post('/curso', curso), (data) =>
      set((state) => ({
        cursos: [...state.cursos, data],
      }))
    );
  },

  updateCurso: async (id, updateData) => {
    return await handleRequest(() => api.put(`/curso/${id}`, updateData), (data) =>
      set((state) => ({
        cursos: state.cursos.map((curso) =>
          curso.id === id ? { ...curso, ...data } : curso
        ),
      }))
    );
  },

  deleteCurso: async (id) => {
    await handleRequest(() => api.delete(`/curso/${id}`), () =>
      set((state) => ({
        cursos: state.cursos.filter((curso) => curso.id !== id),
      }))
    );
  },
}));

export default useCursoStore;
