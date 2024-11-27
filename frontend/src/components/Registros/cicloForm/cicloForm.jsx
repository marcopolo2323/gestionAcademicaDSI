import { useState, useEffect } from 'react';
import useCicloStore from '../../../store/CicloStore'; // Ajusta el path según tu estructura

const CicloForm = () => {
  const { Ciclos, fetchCiclos, addCiclo, updateCiclo } = useCicloStore();

  const [numeroCiclo, setNumeroCiclo] = useState('');
  const [estado, setEstado] = useState('ACTIVO');
  const [cicloId, setCicloId] = useState(null); // Para identificar si es edición o creación

  useEffect(() => {
    fetchCiclos();
  }, [fetchCiclos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cicloData = { numero_ciclo: parseInt(numeroCiclo, 10), estado };

    if (cicloId) {
      // Editar ciclo existente
      await updateCiclo(cicloId, cicloData);
      setCicloId(null);
    } else {
      // Agregar nuevo ciclo
      await addCiclo(cicloData);
    }

    // Limpiar formulario
    setNumeroCiclo('');
    setEstado('ACTIVO');
  };

  const handleEdit = (ciclo) => {
    setCicloId(ciclo.ciclo_id);
    setNumeroCiclo(ciclo.numero_ciclo);
    setEstado(ciclo.estado);
  };

  return (
    <div>
      <h1>Gestión de Ciclos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numeroCiclo">Número de Ciclo (1-6):</label>
          <input
            type="number"
            id="numeroCiclo"
            value={numeroCiclo}
            onChange={(e) => setNumeroCiclo(e.target.value)}
            min="1"
            max="6"
            required
          />
        </div>
        <div>
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </select>
        </div>
        <button type="submit">{cicloId ? 'Actualizar Ciclo' : 'Agregar Ciclo'}</button>
      </form>

      <h2>Lista de Ciclos</h2>
      <table>
        <thead>
          <tr>
            <th>Número de Ciclo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Ciclos.map((ciclo) => (
            <tr key={ciclo.ciclo_id}>
              <td>{ciclo.numero_ciclo}</td>
              <td>{ciclo.estado}</td>
              <td>
                <button onClick={() => handleEdit(ciclo)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Estilos opcionales para la tabla */}
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      `}</style>

    </div>
  );
};

export default CicloForm;