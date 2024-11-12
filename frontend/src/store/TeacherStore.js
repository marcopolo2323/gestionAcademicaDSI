import { create } from 'zustand';
import axios from 'axios';

const useTeacherStore = create((set) => ({
  teachers: [],
  addTeacher: async (teacher) => {
    try {
      const response = await axios.post('http://localhost:3001/profesor', teacher);
      set((state) => ({
        teachers: [...state.teachers, response.data],
      }));
    } catch (error) {
      console.log('Error adding teacher:', error.message);
    }
  },
  fetchTeachers: async () => {
    try {
      const response = await axios.get('http://localhost:3001/profesor');
      set({ teachers: response.data });
    } catch (error) {
      console.log('Error fetching teachers:', error.message);
    }
  },
  deleteTeacher: async (id) => {
    try {
      await axios.delete(`http://localhost:3001/profesor/${id}`);
      set((state) => ({
        teachers: state.teachers.filter((teacher) => teacher.id !== id),
      }));
    } catch (error) {
      console.log('Error deleting teacher:', error.message);
    }
  },
  updateTeacher: async (id, updateData) => {
    try {
      const response = await axios.put(`http://localhost:3001/profesor/${id}`, updateData);
      set((state) => ({
        teachers: state.teachers.map((teacher) =>
          teacher.id === id ? response.data : teacher
        ),
      }));
    } catch (error) {
      console.log('Error updating teacher:', error.message);
    }
  },
}));

export default useTeacherStore;