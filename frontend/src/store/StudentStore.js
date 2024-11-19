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
}));

export default useStudentStore;
