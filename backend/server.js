const express = require('express');
const router = require('./routes')
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
require('./seed/CrearCiclos'); // O la ruta correcta donde esté el script
require('./seed/CrearRoles');  // O la ruta correcta donde esté el archivo

const cors = require('cors')
const morgan = require('morgan')
const server = express()

server.use(cors())
server.use(morgan('combined'))
server.use(express.json())//convierte la informacion
server.use('/',authRoutes)
server.use(router)



module.exports = server