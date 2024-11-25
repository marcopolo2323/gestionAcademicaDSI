const Horario = require('../models/Horario'); // Asegúrate de que el modelo de Horario esté definido correctamente

// Crea un nuevo horario
const createHorarioController = async ({ horario_id,dia,horaInicio,horaFin,aula }) => {
    try { 
        const newHorario = await Horario.create({  horario_id,dia,horaInicio,horaFin,aula });
        return newHorario;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todos los horarios
const getAllHorariosController = async () => {
    try {
        const horarios = await Horario.findAll(); // Obtiene todos los horarios
        return horarios;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un horario por ID
const updatedHorarioByIdController = async (horario_id, horarioData) => {
    try {
        const updatedHorario = await Horario.findByPk(horario_id);
        if (!updatedHorario) {
            return null; // Retorna null si no se encuentra el horario
        }
        await updatedHorario.update(horarioData);
        return updatedHorario;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar un horario por ID
const deleteHorarioByIdController = async (horario_id) => {
    try {
        const deletedHorario = await Horario.destroy({
            where: { id: horario_id } // Cambiado a 'id' según el modelo
        });

        if (deletedHorario === 0) {
            throw new Error('Horario no encontrado');
        }

        return { message: 'Horario eliminado exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar el horario: ${error.message}`);
    }
};

module.exports = {
    createHorarioController,
    getAllHorariosController,
    updatedHorarioByIdController,
    deleteHorarioByIdController
};