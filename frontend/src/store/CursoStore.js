import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const useCursoStore = create((set) => ({
  cursos: [],
  cursosEnCiclo: [], // Nuevo estado para cursos filtrados por ciclo

  fetchCursos: async () => {
    await handleRequest(() => api.get('/curso'), (data) =>
      set({ cursos: data })
    );
  },

  // Nueva función para filtrar cursos por ciclo
  fetchCursosByCiclo: async (cicloId) => {
    try {
      console.log('Fetching courses for ciclo:', cicloId);
      const response = await api.get(`/curso/ciclo/${cicloId}`);
      console.log('Courses response:', response.data);
      set({ cursosEnCiclo: response.data });
      return response.data;
    } catch (error) {
      console.error('Detailed error fetching cursos by ciclo:', error.response || error);
      set({ cursosEnCiclo: [] });
      return [];
    }
  },

  // Resto de las funciones existentes...
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