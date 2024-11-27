const Ciclo = require('../models/Ciclo'); // Asegúrate de que el modelo de Ciclo esté definido correctamente

// Crea un nuevo Ciclo
const createCicloController = async ({ ciclo_id,numero_ciclo,estado,fecha_registro }) => {
    try { 
        const newCiclo = await Ciclo.create({  ciclo_id,numero_ciclo,estado,fecha_registro });
        return newCiclo;
    } catch (error) {
        throw new Error(error.message);
    } 
};

// Obtener todos los Ciclos
const getAllCiclosController = async () => {
    try {
        const ciclos = await Ciclo.findAll();
        
        // Mapear los resultados para que coincidan con el frontend
        return ciclos.map(ciclo => ({
            ciclo_id: ciclo.ciclo_id,
            nombre: ciclo.numero_ciclo, // Mapear 'numero_ciclo' a 'nombre'
            estado: ciclo.estado
        }));
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un Ciclo por ID
const updatedCicloByIdController = async (Ciclo_id, CicloData) => {
    try {
        const updatedCiclo = await Ciclo.findByPk(Ciclo_id);
        if (!updatedCiclo) {
            return null; // Retorna null si no se encuentra el Ciclo
        }
        await updatedCiclo.update(CicloData);
        return updatedCiclo;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar un Ciclo por ID
const deleteCicloByIdController = async (Ciclo_id) => {
    try {
        const deletedCiclo = await Ciclo.destroy({
            where: { id: Ciclo_id } // Cambiado a 'id' según el modelo
        });

        if (deletedCiclo === 0) {
            throw new Error('Ciclo no encontrado');
        }

        return { message: 'Ciclo eliminado exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar el Ciclo: ${error.message}`);
    }
};

module.exports = {
    createCicloController,
    getAllCiclosController,
    updatedCicloByIdController,
    deleteCicloByIdController
};