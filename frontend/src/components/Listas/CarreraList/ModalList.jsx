import React, { useState, useEffect } from 'react';
import useCarreraStore from '../../../store/carreraStore'; // Cambiar a función de actualización de Carrera
import { IoSaveOutline } from "react-icons/io5"; 
import { IoTrashOutline } from "react-icons/io5"; 

const Modal = ({ carrera, onClose }) => {
    const { updateCarrera } = useCarreraStore();
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        duracion_semestres: '',
        estado: 'ACTIVO' // Valor por defecto
    });

    useEffect(() => {
        if (carrera) {
            setFormData({
                nombre: carrera.nombre,
                descripcion: carrera.descripcion || '',
                duracion_semestres: carrera.duracion_semestres,
                estado: carrera.estado || 'ACTIVO'
            });
        }
    }, [carrera]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCarrera(carrera.carrera_id, formData);
            alert('Carrera Modificada.');
            onClose(true); // Pasar true al cerrar para indicar que se actualizó
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    return (
        <div className='edit-modal'>
            <div className="modal-content">
                <h3>Modificar Carrera</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        NOMBRE:
                        <input 
                            type="text" 
                            name="nombre" 
                            value={formData.nombre} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <label>
                        DESCRIPCIÓN:
                        <textarea 
                            name="descripcion" 
                            value={formData.descripcion} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>
                        DURACIÓN (Semestres):
                        <input 
                            type="number" 
                            name="duracion_semestres" 
                            value={formData.duracion_semestres} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <label>
                        ESTADO:
                        <select name="estado" value={formData.estado} onChange={handleChange}>
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                        </select>
                    </label>
                    <div className="btns">
                        <button type="submit" className='btn-guardar'>
                            <IoSaveOutline /> Guardar
                        </button>
                        <button type="button" className='btn-cancelar' onClick={() => onClose(false)}>
                            <IoTrashOutline /> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;