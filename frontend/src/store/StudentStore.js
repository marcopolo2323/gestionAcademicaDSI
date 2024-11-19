import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const useStudentStore = create((set) => ({
  students: [],
  addStudent: async (student) => {
    try { 
      const response = await axios.post('http://localhost:3001/estudiante', student);
      set((state) => ({
        students: [...state.students, response.data],
      }));
    } catch (error) {
      console.log('Error adding student:', error.message);
    }
  },
  fetchStudents: async () => {
    try {
      const response = await axios.get('http://localhost:3001/estudiante');
      set({ students: response.data });
    } catch (error) {
      console.log('Error fetching students:', error.message);
    }
  },
  deleteStudent: async (id) => {
    try {
      await axios.delete(`http://localhost:3001/estudiante/${id}`);
      set((state) => ({
        students: state.students.filter((student) => student.id !== id),
      }));
    } catch (error) {
      console.log('Error deleting student:', error.message);
    }
  },
  updateStudent: async (id, updateData) => {
    try {
      const response = await axios.put(`http://localhost:3001/estudiante/${id}`, updateData);
      set((state) => ({
        students: state.students.map((student) =>
          student.id === id ? response.data : student
        ),
      }));
    } catch (error) {
      console.log('Error updating student:', error.message);
    }
  },
}));

export default useStudentStore;
