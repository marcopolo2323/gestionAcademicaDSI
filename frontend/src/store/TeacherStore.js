import { create } from 'zustand';
import axios from 'axios';

const useTeacherStore = create((set) => ({
  teachers: [],
  isLoading: false,
  error: null,

  // Agregar profesor
  addTeacher: async (teacherData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('http://localhost:3001/profesor', teacherData);
      set((state) => ({
        teachers: [...state.teachers, response.data],
        isLoading: false,
      }));
      return response.data; // Retornamos los datos para usarlos en el componente si es necesario
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage); // Lanzamos el error para manejarlo en el componente
    }
  },

  // Obtener profesores
  fetchTeachers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('http://localhost:3001/profesor');
      set({ 
        teachers: response.data,
        isLoading: false 
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      throw new Error(errorMessage);
    }
  },

  // Eliminar profesor
  deleteTeacher: async (profesorId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`http://localhost:3001/profesor/${profesorId}`);
      set((state) => ({
        teachers: state.teachers.filter((teacher) => teacher.profesor_id !== profesorId),
        isLoading: false
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      throw new Error(errorMessage);
    }
  },

  // Actualizar profesor
  updateTeacher: async (profesorId, updateData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`http://localhost:3001/profesor/${profesorId}`, updateData);
      set((state) => ({
        teachers: state.teachers.map((teacher) =>
          teacher.profesor_id === profesorId ? response.data : teacher
        ),
        isLoading: false
      }));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      throw new Error(errorMessage);
    }
  },

  // Obtener profesor por ID
  getTeacherById: async (profesorId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:3001/profesor/${profesorId}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // Limpiar errores
  clearError: () => set({ error: null }),
}));

export default useTeacherStore;