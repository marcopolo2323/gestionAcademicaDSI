import React, { useEffect, useState } from 'react';
import usePlanEstudioStore from '../../../store/planEstudioStore'; // Cambiar a store de PlanEstudio
import Modal from './ModalList';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineEye } from 'react-icons/ai';


const PlanEstudioList = () => {
    const { fetchPlanes, planes, deletePlan } = usePlanEstudioStore(); // Cambiar a funciones de PlanEstudio
    const [deleteModal, setDeleteModal] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null); 
    const [editModal, setEditModal] = useState(false);
    const [planToEdit, setPlanToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPlanes();
    }, []);

    const handleDelete = (id) => {
        deletePlan(id);
        setDeleteModal(false);
    }

    const handleDeleteModal = (planId) => {
        setPlanToDelete(planId);
        setDeleteModal(!deleteModal);
    }

    const handleEditModal = (plan) => {
        setPlanToEdit(plan);
        setEditModal(!editModal);
    }

    // Filtra los planes de estudio según el término de búsqueda
    const filteredPlanes = planes.filter(plan =>
        `${plan.codigo} ${plan.nombre}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='lista'>
            <h1>LISTA DE PLANES DE ESTUDIO</h1>

            {/* Campo de búsqueda */}
            <input 
                type="text"
                placeholder="Buscar por código o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Buscar plan de estudio"
            />

            {/* Tabla de planes de estudio */}
            <table className='student-table'>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Año</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPlanes.map((plan) => (
                        <tr key={plan.plan_id}>
                            <td>{plan.codigo}</td>
                            <td>{plan.nombre}</td>
                            <td>{plan.descripcion}</td>
                            <td>{new Date(plan.fecha_inicio).toLocaleDateString()}</td>
                            <td>{plan.fecha_fin ? new Date(plan.fecha_fin).toLocaleDateString() : 'N/A'}</td>
                            <td>{plan.anio}</td>
                            <td>{plan.estado}</td>
                            <td>
                                <AiOutlineEye className='edit-ico' onClick={() => handleEditModal(plan)} />
                                <RiDeleteBin5Fill className='delete-ico ico' onClick={() => handleDeleteModal(plan.plan_id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {deleteModal && (
                <div className='modal-delete'>
                    <div className="contend">
                        <p>ELIMINAR PLAN DE ESTUDIO</p>
                        <div className="btns">
                            <button className='btn-SI' onClick={() => handleDelete(planToDelete)}>SI</button>
                            <button className='btn-NO' onClick={handleDeleteModal}>NO</button>
                        </div>
                    </div>
                </div>
            )}
            
            {editModal && (
                <Modal plan={planToEdit} onClose={handleEditModal} /> // Cambiar a Modal para PlanEstudio
            )}
        </div>
    );
}

export default PlanEstudioList;