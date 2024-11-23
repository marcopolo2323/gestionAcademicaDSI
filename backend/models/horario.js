module.exports = (sequelize) => {
    const Horario = sequelize.define('Horario', {
      id: {
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
        allowNull: false
      },
      aula: DataTypes.STRING
    });
    return Horario;
  };