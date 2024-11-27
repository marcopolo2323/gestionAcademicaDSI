import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const useTeacherStore = create((set) => ({
  teachers: [],
  isLoading: false,
  error: null,

  addTeacher: async (teacherData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/profesor', teacherData);
      console.log('Respuesta del servidor:', response.data);
      
      set((state) => ({
        teachers: [...state.teachers, response.data], 
        isLoading: false
      }));
      
      return response.data;
    } catch (error) {
      console.error('Error al crear profesor:', error.response?.data || error.message);
      set({ 
        error: error.response?.data?.error || error.message,
        isLoading: false 
      });
      throw new Error(error.response?.data?.error || 'Error al crear profesor');
    }
  },
  
  fetchTeachers: async () => {
    set({ isLoading: true, error: null });
    try {
        const response = await api.get('/profesor');
        console.log('Teachers full response:', response);
        console.log('Teachers response data:', response.data);
        
        // Verificar la estructura de los datos
        const teachersData = response.data.map(teacher => ({
            profesor_id: teacher.profesor_id,
            nombre: teacher.nombre,
            apellido: teacher.apellido,
            // otros campos necesarios
        }));

        console.log('Processed teachers data:', teachersData);
        
        set({ 
            teachers: teachersData,
            isLoading: false 
        });
        
        return teachersData;
    } catch (error) {
        console.error('Error fetching teachers:', error);
        set({ 
            error: error.message, 
            isLoading: false,
            teachers: [] 
        });
        throw error;
    }
},

// Mismo enfoque para fetchCiclos


  updateTeacher: async (id, updateData) => {
    set({ isLoading: true, error: null });
    return await handleRequest(() => api.put(`/profesor/${id}`, updateData), (data) =>
      set((state) => ({
        teachers: state.teachers.map((teacher) =>
          teacher.profesor_id === id ? data : teacher
        ),
        isLoading: false,
      }))
    ).catch((error) => set({ error: error.message, isLoading: false }));
  },

  deleteTeacher: async (id) => {
    set({ isLoading: true, error: null });
    await handleRequest(() => api.delete(`/profesor/${id}`), () =>
      set((state) => ({
        teachers: state.teachers.filter((teacher) => teacher.profesor_id !== id),
        isLoading: false,
      }))
    ).catch((error) => set({ error: error.message, isLoading: false }));
  },

  clearError: () => set({ error: null }),
}));

export default useTeacherStore;
