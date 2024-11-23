import React, { useState, useEffect } from 'react';
import useTeacherStore from '../../store/TeacherStore'; // Cambiar a la tienda de profesores
import { IoSaveOutline } from "react-icons/io5"; 
import { IoTrashOutline } from "react-icons/io5"; 
import './edit.css';

const Modal = ({ professor, onClose }) => {
    const { updateTeacher } = useTeacherStore(); // Cambiar a la función de actualización de profesores
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        dni: '',
        email: '',
        telefono: '',
        direccion: '',
        especialidad: '', // Agregar especialidad
        estado: 'ACTIVO', // Agregar estado por defecto
    });

    useEffect(() => {
        if (professor) {
            setFormData({
                nombres: professor.nombres || '', // Valor por defecto
                apellidos: professor.apellidos || '', // Valor por defecto
                dni: professor.dni || '', // Valor por defecto
                email: professor.email || '', // Valor por defecto
                telefono: professor.telefono || '', // Valor por defecto
                direccion: professor.direccion || '', // Valor por defecto
                especialidad: professor.especialidad || '', // Valor por defecto
                estado: professor.estado || 'ACTIVO', // Valor por defecto
            });
        }
    }, [professor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTeacher(professor.profesor_id, formData); // Cambiar student.id a professor.profesor_id
            alert('Profesor Modificado.');
            onClose();
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Error al modificar el profesor.');
        }
    };

    return (
        <div className='edit-modal'>
            <div className="modal-content">
                <h3>Modificar Profesor</h3>
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
                        ESPECIALIDAD:
                        <input 
                            type="text" 
                            name="especialidad"  
                            value={formData.especialidad}  
                            onChange={handleChange}  
                        />
                    </label>
                    <label>
                        ESTADO:
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                        >
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                            <option value="LICENCIA">LICENCIA</option>
                        </select>
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