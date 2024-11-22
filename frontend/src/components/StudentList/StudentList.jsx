import React, { useEffect, useState } from 'react';
import useStudentStore from '../../store/studentStore';
import Modal from './ModalList';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineEye } from 'react-icons/ai';
import './lista.css';

const StudentList = () => {
    const { fetchStudents, students, deleteStudent } = useStudentStore();
    const [deleteModal, setDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null); 
    const [editModal, setEditModal] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = (id) => {
        deleteStudent(id);
        setDeleteModal(false);
    }

    const handleDeleteModal = (studentId) => {
        setStudentToDelete(studentId);
        setDeleteModal(!deleteModal);
    }

    const handleEditModal = (student) => {
        setStudentToEdit(student);
        setEditModal(!editModal);
    }

    // Filtra los estudiantes según el término de búsqueda
    const filteredStudents = students.filter(student =>
        `${student.nombres} ${student.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='lista'>
            <h1>LISTA DE ESTUDIANTES</h1>

            {/* Campo de búsqueda */}
            <input 
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Buscar estudiante"
            />

            {/* Tabla de estudiantes */}
            <table className='student-table'>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>NOMBRE</th>
                        <th>APELLIDOS</th>
                        <th>FECHA NACIMIENTO</th>
                        <th>DIRECCION</th>
                        <th>TELEFONO</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student) => (
                        <tr key={student.estudiante_id}>
                            <td>{student.dni}</td>
                            <td>{student.nombres}</td>
                            <td>{student.apellidos}</td>
                            <td>{student.fecha_nacimiento}</td>
                            <td>{student.direccion}</td>
                            <td>{student.telefono}</td>
                            <td>{student.email}</td>
                            <td>
                                <AiOutlineEye className='edit-ico' onClick={() => handleEditModal(student)} />
                                <RiDeleteBin5Fill className='delete-ico ico' onClick={() => handleDeleteModal(student.estudiante_id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {deleteModal && (
                <div className='modal-delete'>
                    <div className="contend">
                        <p>ELIMINAR ESTUDIANTE</p>
                        <div className="btns">
                            <button className='btn-SI' onClick={() => handleDelete(studentToDelete)}>SI</button>
                            <button className='btn-NO' onClick={handleDeleteModal}>NO</button>
                        </div>
                    </div>
                </div>
            )}
            
            {editModal && (
                <Modal student={studentToEdit} onClose={handleEditModal} />
            )}
        </div>
    );
}

export default StudentList;