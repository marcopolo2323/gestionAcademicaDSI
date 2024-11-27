import React, { useState, useEffect } from 'react';
import usePlanEstudioStore from '../../../store/planEstudioStore'; // Cambiar a store de PlanEstudio
import { IoSaveOutline } from "react-icons/io5"; 
import { IoTrashOutline } from "react-icons/io5"; 


const Modal = ({ plan, onClose }) => {
    const { updatePlan } = usePlanEstudioStore(); // Cambiar a función de actualización de PlanEstudio
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        anio: '',
        estado: 'ACTIVO' // Valor por defecto
    });

    useEffect(() => {
        if (plan) {
            setFormData({
                codigo: plan.codigo,
                nombre: plan.nombre,
                descripcion: plan.descripcion || '', // Valor por defecto
                fecha_inicio: plan.fecha_inicio ? new Date(plan.fecha_inicio).toISOString().split('T')[0] : '', // Formato de fecha
                fecha_fin: plan.fecha_fin ? new Date(plan.fecha_fin).toISOString().split('T')[0] : '', // Formato de fecha
                anio: plan.anio,
                estado: plan.estado || 'ACTIVO' // Valor por defecto
            });
        }
    }, [plan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePlan(plan.plan_id, formData); // Cambiar student.id a plan.plan_id
            alert('Plan de Estudio Modificado.');
            onClose();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    return (
        <div className='edit-modal'>
            <div className="modal-content">
                <h3>Modificar Plan de Estudio</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        CÓDIGO:
                        <input 
                            type="text" 
                            name="codigo" 
                            value={formData.codigo} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
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
                        FECHA DE INICIO:
                        <input 
                            type="date" 
                            name="fecha_inicio" 
                            value={formData.fecha_inicio} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <label>
                        FECHA DE FIN:
                        <input 
                            type="date" 
                            name="fecha_fin" 
                            value={formData.fecha_fin} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>
                        AÑO:
                        <input 
                            type="number" 
                            name="anio" 
                            value={formData.anio} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <label>
                        ESTADO:
                        <select name="estado" value={formData.estado} onChange={handleChange}>
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                            <option value="EN REVISIÓN">EN REVISIÓN</option>
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