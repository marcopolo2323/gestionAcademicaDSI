const Estudiante = require('../models/Estudiante'); // Asegúrate de que el modelo de Estudiante esté definido correctamente

// Crea un nuevo estudiante
const createEstudianteController = async ({ estudiante_id,usuario_id,ciclo_id, dni, nombres, apellidos, fecha_nacimiento, direccion, telefono, email,estado,fecha_registro }) => {
    try {
        const newEstudiante = await Estudiante.create({estudiante_id,usuario_id,ciclo_id, dni, nombres, apellidos, fecha_nacimiento, direccion, telefono, email,estado,fecha_registro });
        return newEstudiante; 
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todos los estudiantes
const getAllEstudiantesController = async () => {
    try {
        const estudiantes = await Estudiante.findAll(); // Obtiene todos los estudiantes
        return estudiantes;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un estudiante por ID
const updatedEstudianteByIdController = async (estudiante_id, estudianteData) => {
    try {
        const updatedEstudiante = await Estudiante.findByPk(estudiante_id);
        if (!updatedEstudiante) {
            return null; // Retorna null si no se encuentra el estudiante
        }
        await updatedEstudiante.update(estudianteData);
        return updatedEstudiante;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar un estudiante por ID
const deleteEstudianteByIdController = async (estudiante_id) => {
    try {
        const deletedEstudiante = await Estudiante.destroy({
            where: { estudiante_id: estudiante_id }
        });

        if (deletedEstudiante === 0) {
            throw new Error('Estudiante no encontrado');
        }

        return { message: 'Estudiante eliminado exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar el estudiante: ${error.message}`);
    }
};

module.exports = {
    createEstudianteController,
    getAllEstudiantesController,
    updatedEstudianteByIdController,
    deleteEstudianteByIdController
};