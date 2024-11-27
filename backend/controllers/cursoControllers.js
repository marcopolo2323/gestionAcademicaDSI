const Curso = require('../models/Curso'); // Asegúrate de que el modelo de Curso esté definido correctamente

// Crea un nuevo curso
const createCursoController = async ({curso_id, plan_id, profesor_id,horario_id,nombre,codigo, periodo_academico, paralelo, cupo_maximo, aula, estado }) => {
    try { 
        const newCurso = await Curso.create({curso_id, plan_id, profesor_id,horario_id,nombre,codigo, periodo_academico, paralelo, cupo_maximo, aula, estado });
        return newCurso;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todos los cursos
const getAllCursosController = async () => {
    try {
        const cursos = await Curso.findAll(); // Obtiene todos los cursos
        return cursos;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un curso por ID
const updatedCursoByIdController = async (curso_id, cursoData) => {
    try {
        const updatedCurso = await Curso.findByPk(curso_id);
        if (!updatedCurso) {
            return null; // Retorna null si no se encuentra el curso
        }
        await updatedCurso.update(cursoData);
        return updatedCurso;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar un curso por ID
const deleteCursoByIdController = async (curso_id) => {
    try {
        const deletedCurso = await Curso.destroy({
            where: { curso_id: curso_id }
        });

        if (deletedCurso === 0) {
            throw new Error('Curso no encontrado');
        }

        return { message: 'Curso eliminado exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar el curso: ${error.message}`);
    }
};

const getCursosByCicloController = async (req, res) => {
    try {
        const { ciclo_id } = req.params;
        
        console.log('Received ciclo_id:', ciclo_id);
        
        const cursos = await Curso.findAll({
            where: { 
                ciclo_id: ciclo_id 
            }
        });
        
        console.log('Found courses:', cursos);
        
        res.status(200).json(cursos);
    } catch (error) {
        console.error('Detailed error obtaining courses by ciclo:', error);
        res.status(500).json({ 
            message: 'Error obtaining courses by ciclo',
            error: error.message,
            stack: error.stack
        });
    }
};

module.exports = {
    createCursoController,
    getAllCursosController,
    updatedCursoByIdController,
    deleteCursoByIdController,
    getCursosByCicloController
};