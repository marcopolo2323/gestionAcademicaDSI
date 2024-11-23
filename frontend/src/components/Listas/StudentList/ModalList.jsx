import React, { useState, useEffect } from 'react';
import useStudentStore from '../../../store/studentStore';
import { IoSaveOutline } from "react-icons/io5"; 
import { IoTrashOutline } from "react-icons/io5"; 
import './edit.css';

const Modal = ({ student, onClose }) => {
    const { updateStudent } = useStudentStore();
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        dni: '',
        email: '',
        telefono: '',
        direccion: '',
        fecha_nacimiento: ''
    });

    useEffect(() => {
        if (student) {
            setFormData({
                nombres: student.nombres,
                apellidos: student.apellidos,
                dni: student.dni,
                email: student.email || '', // Valor por defecto
                telefono: student.telefono || '', // Valor por defecto
                direccion: student.direccion || '', // Valor por defecto
                fecha_nacimiento: student.fecha_nacimiento ? new Date(student.fecha_nacimiento).toISOString().split('T')[0] : '' // Formato de fecha
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStudent(student.estudiante_id, formData); // Cambia student.id a student.estudiante_id
            alert('Estudiante Modificado.');
            onClose();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    return (
        <div className='edit-modal'>
            <div className="modal-content">
                <h3>Modificar Estudiante</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        NOMBRES:
                        <input 
                            type="text" 
                            name="nombres" 
                            value={formData.nombres} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <label>
                        APELLIDOS:
                        <input 
                            type="text" 
                            name="apellidos" 
                            value={formData.apellidos} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <label>
                        DNI:
                        <input 
                            type="text" 
                            name="dni" 
                            value={formData.dni} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <label>
                        EMAIL:
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>
                        TELÉFONO:
                        <input 
                            type="text" 
                            name="telefono" 
                            value={formData.telefono} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>
                        DIRECCIÓN:
                        <input 
                            type="text" 
                            name="direccion" 
                            value={formData.direccion} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>
                        FECHA DE NACIMIENTO:
                        <input 
                            type="date" 
                            name="fecha_nacimiento" 
                            value={formData.fecha_nacimiento} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <div className="btns">
                        <button type="submit" className='btn-guardar'>
                            <IoSaveOutline /> Guardar
                        </button>
                        <button type="button" className='btn-cancelar' onClick={onClose}>
                            <IoTrashOutline /> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;