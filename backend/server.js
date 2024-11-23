const express = require('express');
const router = require('./routes')
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const cors = require('cors')
const morgan = require('morgan')
const server = express()


server.use(cors())
server.use(morgan('combined'))
server.use(express.json())//convierte la informacion
server.use('/',authRoutes)
server.use(router)



module.exports = server