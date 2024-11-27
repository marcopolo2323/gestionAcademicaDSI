const Matricula = require('../models/Matricula'); // Asegúrate de que el modelo de Matricula esté definido correctamente

// Crea una nueva matrícula
const createMatriculaController = async ({ matricula_id, estudiante_id, curso_id,ciclo_id, fecha_matricula,estado }) => {
    try {
        const newMatricula = await Matricula.create({ 
            matricula_id,
            estudiante_id, 
            curso_id, 
            ciclo_id,
            fecha_matricula, 
            estado 
        });
        return newMatricula;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todas las matrículas
const getAllMatriculasController = async () => {
    try {
        const matriculas = await Matricula.findAll(); // Obtiene todas las matrículas
        return matriculas;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar una matrícula por ID
const updatedMatriculaByIdController = async (matricula_id, matriculaData) => {
    try {
        const updatedMatricula = await Matricula.findByPk(matricula_id);
        if (!updatedMatricula) {
            return null; // Retorna null si no se encuentra la matrícula
        }
        await updatedMatricula.update(matriculaData);
        return updatedMatricula;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar una matrícula por ID
const deleteMatriculaByIdController = async (matricula_id) => {
    try {
        const deletedMatricula = await Matricula.destroy({
            where: { matricula_id: matricula_id }
        });

        if (deletedMatricula === 0) {
            throw new Error('Matrícula no encontrada');
        }

        return { message: 'Matrícula eliminada exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar la matrícula: ${error.message}`);
    }
};

module.exports = {
    createMatriculaController,
    getAllMatriculasController,
    updatedMatriculaByIdController,
    deleteMatriculaByIdController
};