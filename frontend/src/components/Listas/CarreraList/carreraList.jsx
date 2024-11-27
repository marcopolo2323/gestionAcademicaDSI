import React, { useEffect, useState } from 'react';
import useCarreraStore from '../../../store/carreraStore'; // Asegúrate de que esta ruta sea correcta
import Modal from './ModalList';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineEye } from 'react-icons/ai';

const CarreraList = () => {
    const { fetchcarreras, carreras, deleteCarrera } = useCarreraStore();
    const [deleteModal, setDeleteModal] = useState(false);
    const [carreraToDelete, setCarreraToDelete] = useState(null); 
    const [editModal, setEditModal] = useState(false);
    const [carreraToEdit, setCarreraToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchcarreras(); // Cargar las carreras al montar el componente
    }, []);

    const handleDelete = (id) => {
        deleteCarrera(id);
        setDeleteModal(false);
    }

    const handleDeleteModal = (carreraId) => {
        setCarreraToDelete(carreraId);
        setDeleteModal(!deleteModal);
    }

    const handleEditModal = (carrera) => {
        setCarreraToEdit(carrera);
        setEditModal(!editModal);
    }

    // Filtra las carreras según el término de búsqueda
    const filteredCarreras = carreras.filter(carrera =>
        `${carrera.nombre} ${carrera.descripcion}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='lista'>
            <h1>LISTA DE CARRERAS</h1>

            {/* Campo de búsqueda */}
            <input 
                type="text"
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Buscar carrera"
            />

            {/* Tabla de carreras */}
            <table className='student-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Duración (Semestres)</th>
                        <th>Estado</th>
                        <th>Fecha Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCarreras.map((carrera) => (
                        <tr key={carrera.carrera_id}>
                            <td>{carrera.carrera_id}</td>
                            <td>{carrera.nombre}</td>
                            <td>{carrera.descripcion}</td>
                            <td>{carrera.duracion_semestres}</td>
                            <td>{carrera.estado}</td>
                            <td>{new Date(carrera.fecha_registro).toLocaleDateString()}</td>
                            <td>
                                <AiOutlineEye className='edit-ico' onClick={() => handleEditModal(carrera)} />
                                <RiDeleteBin5Fill className='delete-ico ico' onClick={() => handleDeleteModal(carrera.carrera_id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {deleteModal && (
                <div className='modal-delete'>
                    <div className="contend">
                        <p>ELIMINAR CARRERA</p>
                        <div className="btns">
                            <button className='btn-SI' onClick={() => handleDelete(carreraToDelete)}>SI</button>
                            <button className='btn-NO' onClick={handleDeleteModal}>NO</button>
                        </div>
                    </div>
                </div>
            )}
            
            {editModal && (
                // Pasar una función para actualizar la tabla al cerrar el modal
                <Modal carrera={carreraToEdit} onClose={(updated) => {
                    setEditModal(false); // Cerrar modal
                    if (updated) fetchCarreras(); // Volver a cargar las carreras si se actualizó
                }} />
            )}
        </div>
    );
}

export default CarreraList;