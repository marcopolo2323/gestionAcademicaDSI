import { create } from 'zustand';
import { api } from '../utils/api';

const useCicloStore = create((set) => ({
  ciclos: [],
  isLoading: false,
  error: null,

  fetchCiclos: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/ciclo');
      console.log('Respuesta de ciclos:', response.data);
      set({ 
        ciclos: response.data,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching ciclos:', error);
      set({ 
        error: error.message, 
        isLoading: false 
      });
      throw error;
    }
  },

  addCiclo: async (Ciclo) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/ciclo', Ciclo);
      set((state) => ({
        ciclos: [...state.ciclos, response.data],
        isLoading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
      throw error;
    }
  },

  updateCiclo: async (id, updateData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/ciclo/${id}`, updateData);
      set((state) => ({
        ciclos: state.ciclos.map((Ciclo) =>
          Ciclo.ciclo_id === id ? response.data : Ciclo
        ),
        isLoading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
      throw error;
    }
  },

  deleteCiclo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/ciclo/${id}`);
      set((state) => ({
        ciclos: state.ciclos.filter((Ciclo) => Ciclo.ciclo_id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useCicloStore;
