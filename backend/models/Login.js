const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Login = sequelize.define('Login', {
    login_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Puede ser nulo si no se desea registrar un usuario
        references: {
            model: 'USUARIOS', // Nombre de la tabla referenciada
            key: 'usuario_id'
        }
    },
    fecha_login: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Establece la fecha y hora actual por defecto
    },
    ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true // Puede ser nulo si no se desea registrar la IP
    },
    estado: {
        type: DataTypes.ENUM('EXITOSO', 'FALLIDO'),
        allowNull: false
    },
    intento: {
        type: DataTypes.INTEGER,
        defaultValue: 1 // Valor por defecto para el número de intentos
    }
}, {
    tableName: 'LOGIN', // Asegúrate de que el nombre de la tabla coincida con el de la base de datos
    timestamps: false // Si no tienes columnas de createdAt y updatedAt en tu tabla
});

// Exportar el modelo
module.exports = Login;