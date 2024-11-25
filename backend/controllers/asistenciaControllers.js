const Asistencia = require('../models/Asistencia'); // Asegúrate de que el modelo de Asistencia esté definido correctamente

// Crea una nueva asistencia
const createAsistenciaController = async ({asistencia_id, matricula_id, fecha, estado,hora_registro,minutos_atraso, observacion,documento_justificacion }) => {
    try {
        const newAsistencia = await Asistencia.create({asistencia_id, matricula_id, fecha, estado,hora_registro,minutos_atraso, observacion,documento_justificacion});
        return newAsistencia;
    } catch (error) { 
        throw new Error(error.message);
    }
};

// Obtener todas las asistencias
const getAllAsistenciasController = async () => {
    try {
        const asistencias = await Asistencia.findAll(); // Obtiene todas las asistencias
        return asistencias;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar una asistencia por ID
const updatedAsistenciaByIdController = async (asistencia_id, asistenciaData) => {
    try {
        const updatedAsistencia = await Asistencia.findByPk(asistencia_id);
        if (!updatedAsistencia) {
            return null; // Retorna null si no se encuentra la asistencia
        }
        await updatedAsistencia.update(asistenciaData);
        return updatedAsistencia;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar una asistencia por ID
const deleteAsistenciaByIdController = async (asistencia_id) => {
    try {
        const deletedAsistencia = await Asistencia.destroy({
            where: { asistencia_id: asistencia_id }
        });

        if (deletedAsistencia === 0) {
            throw new Error('Asistencia no encontrada');
        }

        return { message: 'Asistencia eliminada exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar la asistencia: ${error.message}`);
    }
};

module.exports = {
    createAsistenciaController,
    getAllAsistenciasController,
    updatedAsistenciaByIdController,
    deleteAsistenciaByIdController
};