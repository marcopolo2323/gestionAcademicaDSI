import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { Link } from 'react-router-dom';
import useHorarioStore from '../../../store/HorarioStore';

const RegistroHorario = () => {
  const [ciclo, setCiclo] = useState('');
  const [horario, setHorario] = useState([
    ['14:15-15:00', '', '', '', '', ''],
    ['15:00-15:45', '', '', '', '', ''],
    ['15:45-16:30', '', '', '', '', ''],
    ['16:30-17:15', '', '', '', '', ''],
    ['17:15-18:00', '', '', '', '', ''],
    ['18:00-18:20', 'R', 'E', 'C', 'R', 'E'], 
    ['18:20-19:05', '', '', '', '', ''],
    ['19:05-19:50', '', '', '', '', '']
  ]);

  const { addHorario } = useHorarioStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Enviar el horario a la API
      const response = await api.post('/horario', {
        ciclo,
        horario
      });

      // Agregar el horario a la tienda Zustand
      await addHorario(response.data);

      // Reiniciar los campos
      setCiclo('');
      setHorario([
        ['14:15-15:00', '', '', '', '', ''],
        ['15:00-15:45', '', '', '', '', ''],
        ['15:45-16:30', '', '', '', '', ''],
        ['16:30-17:15', '', '', '', '', ''],
        ['17:15-18:00', '', '', '', '', ''],
        ['18:00-18:20', 'R', 'E', 'C', 'R', 'E'], 
        ['18:20-19:05', '', '', '', '', ''],
        ['19:05-19:50', '', '', '', '', '']
      ]);

      alert('Horario registrado correctamente');
    } catch (error) {
      console.error('Error al registrar horario:', error);
      alert('Hubo un error al registrar el horario');
    }
  };

  const handleHorarioChange = (rowIndex, colIndex, value) => {
    const updatedHorario = [...horario];
    updatedHorario[rowIndex][colIndex] = value;
    setHorario(updatedHorario);
  };

  return (
    <div className="registro-horario-container">
      <h2 className="registro-horario-header">Registro de Horario</h2>
      <form onSubmit={handleSubmit} className="registro-horario-form">
        <label className="registro-horario-label">
          Ciclo:
          <input
            type="text"
            value={ciclo}
            onChange={(e) => setCiclo(e.target.value)}
            required
            className="registro-horario-input"
          />
        </label>
        <div className="registro-horario-table-container">
          <table className="registro-horario-table">
            <thead>
              <tr>
                <th className="registro-horario-th">Hora</th>
                <th className="registro-horario-th">Lunes</th>
                <th className="registro-horario-th">Martes</th>
                <th className="registro-horario-th">Miércoles</th>
                <th className="registro-horario-th">Jueves</th>
                <th className="registro-horario-th">Viernes</th>
              </tr>
            </thead>
            <tbody>
              {horario.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="registro-horario-td">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleHorarioChange(rowIndex, colIndex, e.target.value)}
                        className="registro-horario-input"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit" className="registro-horario-button">Registrar Horario</button>
        <Link to="/inicio" className="volverButton1">Volver</Link>
      </form>
    </div>
  );
};

export default RegistroHorario;