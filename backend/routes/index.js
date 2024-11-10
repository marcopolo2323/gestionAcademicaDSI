const { Router } = require('express');
const usuarioRouter = require('./usuarioRoutes');
const rolesRouter = require('./rolesRoutes'); 
const rolesusuariosRouter =require('./rolesusuariosRoutes')
const estudianteRouter= require('./estudianteRoutes')
const profesorRouter= require('./profesorRoutes')
const carreraRouter= require('./carreraRoutes')
const planestudioRouter= require('./planestudioRoutes')
const materiaRouter= require('./materiaRoutes')
const cursoRouter= require('./cursoRoutes')
const matriculaRouter= require('./matriculaRoutes')
const asistenciaRouter= require('./asistenciaRoutes')
const calificacionRouter= require('./calificacionRoutes')
const loginRouter = require('./loginRoutes')


// Importa el nuevo enrutador de roles// Asegúrate de que esta ruta sea correcta

const router = Router();

// Usa el courseRouter bajo el prefijo '/courses'
router.use('/usuarios', usuarioRouter);
router.use('/roles', rolesRouter);
router.use('/rolesusuarios', rolesusuariosRouter);
router.use('/estudiante',estudianteRouter)
router.use('/profesor',profesorRouter)
router.use('/carrera',carreraRouter)
router.use('/planestudio',planestudioRouter)
router.use('/materia',materiaRouter)
router.use('/curso',cursoRouter)
router.use('/matricula',matriculaRouter)
router.use('/asistencia',asistenciaRouter)
router.use('/calificacion',calificacionRouter)
router.use('/login',loginRouter)





module.exports = router;