const Calificacion = require('../models/Calificacion'); // Asegúrate de que el modelo de Calificacion esté definido correctamente

// Crea una nueva calificación
const createCalificacionController = async ({calificacion_id, matricula_id, tipo_evaluacion, nota, fecha, observacion }) => {
    try {
        const newCalificacion = await Calificacion.create({calificacion_id, matricula_id, tipo_evaluacion, nota, fecha, observacion });
        return newCalificacion;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todas las calificaciones
const getAllCalificacionesController = async () => {
    try {
        const calificaciones = await Calificacion.findAll(); // Obtiene todas las calificaciones
        return calificaciones;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar una calificación por ID
const updatedCalificacionByIdController = async (calificacion_id, calificacionData) => {
    try {
        const updatedCalificacion = await Calificacion.findByPk(calificacion_id);
        if (!updatedCalificacion) {
            return null; // Retorna null si no se encuentra la calificación
        }
        await updatedCalificacion.update(calificacionData);
        return updatedCalificacion;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar una calificación por ID
const deleteCalificacionByIdController = async (calificacion_id) => {
    try {
        const deletedCalificacion = await Calificacion.destroy({
            where: { calificacion_id: calificacion_id }
        });

        if (deletedCalificacion === 0) {
            throw new Error('Calificación no encontrada');
        }

        return { message: 'Calificación eliminada exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar la calificación: ${error.message}`);
    }
};

module.exports = {
    createCalificacionController,
    getAllCalificacionesController,
    updatedCalificacionByIdController,
    deleteCalificacionByIdController
};