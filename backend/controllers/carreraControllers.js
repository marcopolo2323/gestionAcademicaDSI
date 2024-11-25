const Carrera = require('../models/Carrera'); // Asegúrate de que el modelo de Carrera esté definido correctamente

// Crea una nueva carrera
const createCarreraController = async ({carrera_id, nombre, descripcion, duracion_semestres, estado, fecha_registro }) => {
    try {
        const newCarrera = await Carrera.create({carrera_id, nombre, descripcion, duracion_semestres, estado, fecha_registro });
        return newCarrera;
    } catch (error) {
        throw new Error(error.message);
    } 
};

// Obtener todas las carreras
const getAllCarrerasController = async () => {
    try {
        const carreras = await Carrera.findAll(); // Obtiene todas las carreras
        return carreras;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar una carrera por ID
const updatedCarreraByIdController = async (carrera_id, carreraData) => {
    try {
        const updatedCarrera = await Carrera.findByPk(carrera_id);
        if (!updatedCarrera) {
            return null; // Retorna null si no se encuentra la carrera
        }
        await updatedCarrera.update(carreraData);
        return updatedCarrera;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar una carrera por ID
const deleteCarreraByIdController = async (carrera_id) => {
    try {
        const deletedCarrera = await Carrera.destroy({
            where: { carrera_id: carrera_id }
        });

        if (deletedCarrera === 0) {
            throw new Error('Carrera no encontrada');
        }

        return { message: 'Carrera eliminada exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar la carrera: ${error.message}`);
    }
};

module.exports = {
    createCarreraController,
    getAllCarrerasController,
    updatedCarreraByIdController,
    deleteCarreraByIdController
};