const PlanEstudio = require('../models/Planestudio'); // Asegúrate de que el modelo de PlanEstudio esté definido correctamente

// Crea un nuevo plan de estudio
const createPlanEstudioController = async (planData) => {
    try {
        // Remove plan_id from data if it exists to allow auto-increment
        const { plan_id, ...dataToCreate } = planData;
        
        // Add default values if not provided
        const completeData = {
            fecha_inicio: new Date(),
            estado: 'ACTIVO',
            ...dataToCreate
        };

        const newPlanEstudio = await PlanEstudio.create(completeData);
        return newPlanEstudio;
    } catch (error) {
        console.error('Error creating Plan de Estudio:', error);
        throw new Error(error.message);
    }
};

// Obtener todos los planes de estudio
const getAllPlanesEstudioController = async () => {
    try {
        const planesEstudio = await PlanEstudio.findAll(); // Obtiene todos los planes de estudio
        return planesEstudio;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un plan de estudio por ID
const updatedPlanEstudioByIdController = async (plan_id, planData) => {
    try {
        const updatedPlanEstudio = await PlanEstudio.findByPk(plan_id);
        if (!updatedPlanEstudio) {
            return null; // Retorna null si no se encuentra el plan de estudio
        }
        await updatedPlanEstudio.update(planData);
        return updatedPlanEstudio;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar un plan de estudio por ID
const deletePlanEstudioByIdController = async (plan_id) => {
    try {
        const deletedPlanEstudio = await PlanEstudio.destroy({
            where: { plan_id: plan_id }
        });

        if (deletedPlanEstudio === 0) {
            throw new Error('Plan de estudio no encontrado');
        }

        return { message: 'Plan de estudio eliminado exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar el plan de estudio: ${error.message}`);
    }
};

module.exports = {
    createPlanEstudioController,
    getAllPlanesEstudioController,
    updatedPlanEstudioByIdController,
    deletePlanEstudioByIdController
};