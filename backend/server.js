const express = require('express');
const router = require('./routes')


const cors = require('cors')
const morgan = require('morgan')
const server = express()



server.use(cors());
server.use(morgan('combined'))
server.use(express.json())//convierte la informacion

server.use(router)



module.exports = server