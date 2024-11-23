import React, { useEffect, useState } from 'react';
import useTeacherStore from '../../store/TeacherStore'; // Asegúrate de que el nombre del store sea correcto
import Modal from './ModalList';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineEye } from 'react-icons/ai';
import './lista.css';

const TeacherList = () => {
    const { fetchTeachers, teachers, deleteTeacher, isLoading, error } = useTeacherStore();
    const [deleteModal, setDeleteModal] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState(null); 
    const [editModal, setEditModal] = useState(false);
    const [teacherToEdit, setTeacherToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTeachers(); // Cargar profesores al inicio
    }, [fetchTeachers]);

    const handleDelete = (id) => {
        deleteTeacher(id);
        setDeleteModal(false);
    }

    const handleDeleteModal = (teacherId) => {
        setTeacherToDelete(teacherId);
        setDeleteModal(!deleteModal);
    }

    const handleEditModal = (teacher) => {
        setTeacherToEdit(teacher);
        setEditModal(!editModal);
    }

    // Filtrar los profesores según el término de búsqueda
    const filteredTeachers = teachers.filter(teacher =>
        `${teacher.nombres} ${teacher.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div>Cargando profesores...</div>; // Mensaje mientras se cargan los datos
    }

    if (error) {
        return <div>Error: {error}</div>; // Mensaje de error si ocurre uno
    }

    return (
        <div className='lista'>
            <h1>LISTA DE PROFESORES</h1>

            {/* Campo de búsqueda */}
            <input 
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Buscar profesor"
            />

            {/* Tabla de profesores */}
            <table className='professor-table'>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>NOMBRE</th>
                        <th>APELLIDOS</th>
                        <th>ESPECIALIDAD</th>
                        <th>TELEFONO</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTeachers.length > 0 ? (
                        filteredTeachers.map((teacher) => (
                            <tr key={teacher.profesor_id}>
                                <td>{teacher.dni}</td>
                                <td>{teacher.nombres}</td>
                                <td>{teacher.apellidos}</td>
                                <td>{teacher.especialidad}</td>
                                <td>{teacher.telefono}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.estado}</td>
                                <td>
                                    <AiOutlineEye className='edit-ico' onClick={() => handleEditModal(teacher)} />
                                    <RiDeleteBin5Fill className='delete-ico ico' onClick={() => handleDeleteModal(teacher.profesor_id)} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="8">No hay profesores disponibles.</td></tr> // Mensaje si no hay profesores
                    )}
                </tbody>
            </table>

            {deleteModal && (
                <div className='modal-delete'>
                    <div className="contend">
                        <p>ELIMINAR PROFESOR</p>
                        <div className="btns">
                            <button className='btn-SI' onClick={() => handleDelete(teacherToDelete)}>SI</button>
                            <button className='btn-NO' onClick={handleDeleteModal}>NO</button>
                        </div>
                    </div>
                </div>
            )}
            
            {editModal && (
                <Modal professor={teacherToEdit} onClose={handleEditModal} />
            )}
        </div>
    );
}

export default TeacherList;