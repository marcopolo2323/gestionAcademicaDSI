const { Router } = require('express');
const usuarioRouter = require('./usuarioRoutes');
const rolesRouter = require('./rolesRoutes'); 
const rolesusuariosRouter =require('./rolesusuariosRoutes')



// Importa el nuevo enrutador de roles// Asegúrate de que esta ruta sea correcta

const router = Router();

// Usa el courseRouter bajo el prefijo '/courses'
router.use('/usuarios', usuarioRouter);
router.use('/roles', rolesRouter);
router.use('/rolesusuarios', rolesusuariosRouter);





module.exports = router;