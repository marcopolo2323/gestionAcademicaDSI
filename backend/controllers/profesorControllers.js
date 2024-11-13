// Ejemplo de un controlador para agregar un profesor
const Teacher = require('../models/Profesor');  // Ajusta esto a tu modelo de datos

const addTeacher = async (teacherData) => {
    try {
      // Verificar que todos los campos necesarios estén presentes
      if (!teacherData.usuario_id) {
        throw new Error('El campo usuario_id es obligatorio');
      }
      if (!teacherData.dni || teacherData.dni.trim() === '') {
        throw new Error('El campo DNI es obligatorio');
      }
  
      // Crear un nuevo profesor usando el modelo Teacher
      const newTeacher = new Teacher({
        usuario_id: teacherData.usuario_id,
        dni: teacherData.dni, // Asegúrate de incluir el dni
        nombres: teacherData.nombres,
        apellidos: teacherData.apellidos,
        especialidad: teacherData.especialidad,
        telefono: teacherData.telefono,
        // Otros campos que puedas necesitar
      });
  
      // Guardar el profesor en la base de datos
      await newTeacher.save();
  
      // Retornar el profesor recién creado
      return newTeacher;
    } catch (error) {
      console.error('Error al crear el profesor:', error);
      throw error;  // Lanzar el error para que sea manejado en la ruta
    }
  };
  

module.exports = { addTeacher };
