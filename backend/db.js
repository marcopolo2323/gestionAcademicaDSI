const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:alfredo96@localhost:5432/tecnologico',{
    logging: false
})

module.exports=sequelize