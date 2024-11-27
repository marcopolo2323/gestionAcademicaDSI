const Profesor = require('../models/Profesor'); // Asegúrate de que el modelo de Profesor esté definido correctamente

// Crea un nuevo profesor
const createProfesorController = async (profesorData) => {
    try {
        // Remove ciclo_id from the data
        const { ciclo_id, ...dataToCreate } = profesorData;
        
        const newProfesor = await Profesor.create(dataToCreate);
        return newProfesor;
    } catch (error) {
        throw new Error(error.message);
    }
};
 
// Obtener todos los profesores
const getAllProfesoresController = async () => {
    try {
        const profesores = await Profesor.findAll();
        
        // Mapear los resultados para que coincidan con el frontend
        return profesores.map(profesor => ({
            profesor_id: profesor.profesor_id,
            nombre: profesor.nombres,     // Mapear 'nombres' a 'nombre'
            apellido: profesor.apellidos, // Mapear 'apellidos' a 'apellido'
            dni: profesor.dni,
            especialidad: profesor.especialidad,
            email: profesor.email,
            estado: profesor.estado
        }));
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un profesor por ID
const updatedProfesorByIdController = async (profesor_id, profesorData) => {
    try {
        const updatedProfesor = await Profesor.findByPk(profesor_id);
        if (!updatedProfesor) {
            return null; // Retorna null si no se encuentra el profesor
        }
        await updatedProfesor.update(profesorData);
        return updatedProfesor;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar un profesor por ID
const deleteProfesorByIdController = async (profesor_id) => {
    try {
        const deletedProfesor = await Profesor.destroy({
            where: { profesor_id: profesor_id }
        });

        if (deletedProfesor === 0) {
            throw new Error('Profesor no encontrado');
        }

        return { message: 'Profesor eliminado exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar el profesor: ${error.message}`);
    }
};

module.exports = {
    createProfesorController,
    getAllProfesoresController,
    updatedProfesorByIdController,
    deleteProfesorByIdController
};