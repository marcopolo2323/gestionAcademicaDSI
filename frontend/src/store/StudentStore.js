import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const useStudentStore = create((set) => ({
  students: [],

  fetchStudents: async () => {
    await handleRequest(() => api.get('/estudiante'), (data) =>
      set({ students: data })
    );
  },

  addStudent: async (student) => {
    return await handleRequest(() => api.post('/estudiante', student), (data) =>
      set((state) => ({
        students: [...state.students, data],
      }))
    );
  },

  updateStudent: async (id, updateData) => {
    return await handleRequest(() => api.put(`/estudiante/${id}`, updateData), (data) =>
      set((state) => ({
        students: state.students.map((student) =>
          student.id === id ? { ...student, ...data } : student
        ),
      }))
    );
  },

  deleteStudent: async (id) => {
    await handleRequest(() => api.delete(`/estudiante/${id}`), () =>
      set((state) => ({
        students: state.students.filter((student) => student.id !== id),
      }))
    );
  },

  fetchStudentsByCiclo: async (cicloId) => {
    try {
      console.log('Fetching students for ciclo:', cicloId); // Add logging
      const response = await api.get(`/estudiante/ciclo/${cicloId}`);
      console.log('Students response:', response.data); // Log the response
  
      const studentsData = response.data;
      set({ students: studentsData });
      
      return studentsData;
    } catch (error) {
      console.error('Detailed error fetching students by ciclo:', error);
      console.error('Error details:', 
        error.response ? error.response.data : error.message
      );
      set({ students: [] });
      throw error;
    }
  },

}));

export default useStudentStore;