//Horario
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Horario = sequelize.define('Horario', {
      horario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dia: {
        type: DataTypes.ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'),
        allowNull: false
      },
      horaInicio: {
        type: DataTypes.TIME,
        allowNull: false
      },
      horaFin: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          isAfterInicio(value) {
              if (!this.horaInicio) {
                  throw new Error('La hora de inicio no está definida.');
              }
              if (value <= this.horaInicio) {
                  throw new Error('La hora de fin debe ser posterior a la hora de inicio.');
              }
          }
      }
      
    },
      aula: DataTypes.STRING
    },{
      tableName: 'HORARIOS',
      timestamps: false,
      indexes: [
        {
            fields: ['dia', 'horaInicio', 'aula'],
            unique: true
        }
    ]
    });

    module.exports = Horario;
