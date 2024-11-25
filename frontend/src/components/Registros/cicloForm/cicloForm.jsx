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
      <ul>
        {Ciclos.map((ciclo) => (
          <li key={ciclo.ciclo_id}>
            {`Ciclo ${ciclo.numero_ciclo} - Estado: ${ciclo.estado}`}
            <button onClick={() => handleEdit(ciclo)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CicloForm;
