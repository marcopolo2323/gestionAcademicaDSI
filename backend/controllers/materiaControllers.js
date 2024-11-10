const Materia = require('../models/Materia'); // Asegúrate de que el modelo de Materia esté definido correctamente

// Crea una nueva materia
const createMateriaController = async ({ materia_id, plan_id, codigo, nombre, descripcion, creditos, horas_teoricas, horas_practicas, prerequisitos }) => {
    try {
        const newMateria = await Materia.create({ materia_id, plan_id, codigo, nombre, descripcion, creditos, horas_teoricas, horas_practicas, prerequisitos });
        return newMateria;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todas las materias
const getAllMateriasController = async () => {
    try {
        const materias = await Materia.findAll(); // Obtiene todas las materias
        return materias;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar una materia por ID
const updatedMateriaByIdController = async (materia_id, materiaData) => {
    try {
        const updatedMateria = await Materia.findByPk(materia_id);
        if (!updatedMateria) {
            return null; // Retorna null si no se encuentra la materia
        }
        await updatedMateria.update(materiaData);
        return updatedMateria;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar una materia por ID
const deleteMateriaByIdController = async (materia_id) => {
    try {
        const deletedMateria = await Materia.destroy({
            where: { materia_id: materia_id }
        });

        if (deletedMateria === 0) {
            throw new Error('Materia no encontrada');
        }

        return { message: 'Materia eliminada exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar la materia: ${error.message}`);
    }
};

module.exports = {
    createMateriaController,
    getAllMateriasController,
    updatedMateriaByIdController,
    deleteMateriaByIdController
};