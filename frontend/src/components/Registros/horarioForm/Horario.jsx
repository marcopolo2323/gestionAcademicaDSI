import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useHorarioStore from '../../../store/HorarioStore';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const HORARIOS_BASE = [
  { inicio: '14:15', fin: '15:00' },
  { inicio: '15:00', fin: '15:45' },
  { inicio: '15:45', fin: '16:30' },
  { inicio: '16:30', fin: '17:15' },
  { inicio: '17:15', fin: '18:00' },
  { inicio: '18:00', fin: '18:20' },
  { inicio: '18:20', fin: '19:05' },
  { inicio: '19:05', fin: '19:50' }
];

const RegistroHorario = () => {
  const [cicloActual, setCicloActual] = useState('');
  const [materias, setMaterias] = useState([]);
  
  const [horarios, setHorarios] = useState(
    HORARIOS_BASE.map(horario => ({
      ...horario,
      clases: DIAS.map(dia => ({
        dia,
        aula: '',
        materia: ''
      }))
    }))
  );

  const { addHorario } = useHorarioStore();

  // Cargar materias del ciclo cuando se seleccione uno
  useEffect(() => {
    const cargarMaterias = async () => {
      if (cicloActual) {
        try {
          // Aquí deberías hacer la llamada a tu API para obtener las materias del ciclo
          const response = await fetch(`/api/materias/ciclo/${cicloActual}`);
          const materiasData = await response.json();
          setMaterias(materiasData);
        } catch (error) {
          console.error('Error al cargar materias:', error);
        }
      }
    };

    cargarMaterias();
  }, [cicloActual]);

  const handleClaseChange = (timeIndex, dayIndex, field, value) => {
    setHorarios(prev => {
      const newHorarios = [...prev];
      newHorarios[timeIndex].clases[dayIndex][field] = value;
      return newHorarios;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cicloActual) {
      alert('Por favor seleccione un ciclo');
      return;
    }

    try {
      // Transformar los datos al formato esperado por el backend
      const horarioParaBackend = horarios.flatMap(horario => 
        horario.clases
          .filter(clase => clase.materia || clase.aula) // Solo enviar slots con datos
          .map(clase => ({
            ciclo_id: cicloActual,
            dia: clase.dia,
            horaInicio: horario.inicio,
            horaFin: horario.fin,
            aula: clase.aula,
            materia: clase.materia
          }))
      );

      // Enviar los datos
      const response = await addHorario(horarioParaBackend);

      // Limpiar el formulario
      setCicloActual('');
      setHorarios(HORARIOS_BASE.map(horario => ({
        ...horario,
        clases: DIAS.map(dia => ({
          dia,
          aula: '',
          materia: ''
        }))
      })));

      alert('Horario registrado correctamente');
    } catch (error) {
      console.error('Error al registrar horario:', error);
      alert('Hubo un error al registrar el horario');
    }
  };

  return (
    <div className="registro-horario-container">
      <h2 className="registro-horario-titulo">Registro de Horario por Ciclo</h2>
      <form onSubmit={handleSubmit} className="registro-horario-form">
        {/* Selección de Ciclo */}
        <div className="registro-ciclo-selector">
          <label htmlFor="ciclo">Ciclo:</label>
          <select
            id="ciclo"
            value={cicloActual}
            onChange={(e) => setCicloActual(e.target.value)}
            required
            className="registro-select"
          >
            <option value="">Seleccione un ciclo</option>
            <option value="1">Primer Ciclo</option>
            <option value="2">Segundo Ciclo</option>
            <option value="3">Tercer Ciclo</option>
            <option value="4">Cuarto Ciclo</option>
            <option value="5">Quinto Ciclo</option>
            <option value="6">Sexto Ciclo</option>
            {/* Agrega más ciclos según necesites */}
          </select>
        </div>

        {/* Tabla de Horarios */}
        <div className="registro-horario-tabla-container">
          <table className="registro-horario-tabla">
            <thead>
              <tr>
                <th className="registro-horario-th">Hora</th>
                {DIAS.map(dia => (
                  <th key={dia} className="registro-horario-th">{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horarios.map((horario, timeIndex) => (
                <tr key={`${horario.inicio}-${horario.fin}`} className="registro-horario-tr">
                  <td className="registro-horario-td-hora">
                    {horario.inicio}-{horario.fin}
                  </td>
                  {horario.clases.map((clase, dayIndex) => (
                    <td key={clase.dia} className="registro-horario-td">
                      {timeIndex === 5 ? (
                        <div className="registro-horario-recreo">
                          RECREO
                        </div>
                      ) : (
                        <div className="registro-horario-inputs">
                          <select
                            value={clase.materia}
                            onChange={(e) => handleClaseChange(timeIndex, dayIndex, 'materia', e.target.value)}
                            className="registro-horario-select-materia"
                          >
                            <option value="">Seleccione materia</option>
                            {materias.map(materia => (
                              <option key={materia.id} value={materia.nombre}>
                                {materia.nombre}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={clase.aula}
                            onChange={(e) => handleClaseChange(timeIndex, dayIndex, 'aula', e.target.value)}
                            placeholder="Aula"
                            className="registro-horario-input-aula"
                          />
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="registro-horario-botones">
          <Link to="/inicio" className="registro-horario-boton-volver">
            Volver
          </Link>
          <button
            type="submit"
            className="registro-horario-boton-registrar"
          >
            Registrar Horario
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroHorario;