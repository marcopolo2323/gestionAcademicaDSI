import { create } from 'zustand';
import axios from 'axios';

const useTeacherStore = create((set) => ({
  teachers: [],

  // Función para agregar un nuevo profesor
  addTeacher: async (teacher) => {
    try {
        console.log('Profesor que se va a agregar:', teacher); // Verifica que todos los campos están presentes

        // Verificar si el campo usuario_id está presente en teacher
        if (!teacher.usuario_id) {
            console.error('El campo usuario_id es obligatorio');
            return;
        }

        if (!teacher.dni) {
            console.error('El campo dni es obligatorio');
            return;
        }

        const response = await axios.post('http://localhost:3001/profesor', teacher, {
            headers: { 'Content-Type': 'application/json' }
        });

        // Actualizar el estado de los profesores
        set((state) => ({
            teachers: [...state.teachers, response.data],
        }));
    } catch (error) {
        console.log('Error al agregar el profesor:', error.response ? error.response.data : error.message);
    }
},


  // Función para obtener la lista de profesores
  fetchTeachers: async () => {
    try {
      const response = await axios.get('http://localhost:3001/profesor');
      set({ teachers: response.data });
    } catch (error) {
      // Manejo de errores al obtener la lista de profesores
      console.error('Error al obtener los profesores:', error.message);
    }
  },

  // Función para eliminar un profesor
  deleteTeacher: async (id) => {
    try {
      await axios.delete(`http://localhost:3001/profesor/${id}`);
      // Actualizar el estado de los profesores después de la eliminación
      set((state) => ({
        teachers: state.teachers.filter((teacher) => teacher.id !== id),
      }));
    } catch (error) {
      console.error('Error al eliminar el profesor:', error.message);
    }
  },

  // Función para actualizar la información de un profesor
  updateTeacher: async (id, updateData) => {
    try {
      const response = await axios.put(`http://localhost:3001/profesor/${id}`, updateData);
      // Actualizar el estado de los profesores después de la actualización
      set((state) => ({
        teachers: state.teachers.map((teacher) =>
          teacher.id === id ? response.data : teacher
        ),
      }));
    } catch (error) {
      console.error('Error al actualizar el profesor:', error.message);
    }
  },
}));

export default useTeacherStore;

