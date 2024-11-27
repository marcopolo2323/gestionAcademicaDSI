import { useEffect, useState } from 'react';
import usecarreraStore from '../../../store/carreraStore';
import usePlanStore from '../../../store/planEstudioStore';

const PlanEstudioForm = () => {
    const { addPlan } = usePlanStore();
    const { carreras, fetchcarreras } = usecarreraStore();

    const [formData, setFormData] = useState({
        carrera_id: '',
        codigo: '', 
        nombre: '',
        descripcion: '',
        anio: '', 
        estado: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.carrera_id) {
            newErrors.carrera_id = 'Seleccione una carrera';
        }
        
        if (!formData.codigo.trim()) {
            newErrors.codigo = 'Código es requerido';
        }
        
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'Nombre es requerido';
        }
        
        if (!formData.anio) {
            newErrors.anio = 'Seleccione un año';
        }
        
        if (!formData.estado) {
            newErrors.estado = 'Seleccione un estado';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
    fetchcarreras();
    console.log('Carreras fetched:', carreras);
}, [fetchcarreras]);

// In your handleChange method
const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name}:`, value);
    
    // If carrera_id is being changed, confirm the selection
    if (name === 'carrera_id') {
        const selectedCarrera = carreras.find(c => c.carrera_id === parseInt(value));
        console.log('Selected Carrera:', selectedCarrera);
    }

    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
    
    // Clear error when user starts typing/selecting
    if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: undefined
        }));
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const selectedCarrera = carreras.find(c => c.carrera_id === parseInt(formData.carrera_id));
    console.log('Selected Carrera for submission:', selectedCarrera);

    const planData = {
        carrera_id: selectedCarrera ? selectedCarrera.carrera_id : null,
        codigo: formData.codigo, 
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        anio: parseInt(formData.anio),
        estado: formData.estado.toUpperCase()
    };

    try {
        console.log('Submitting Plan Data:', planData);
        addPlan(planData);
        
        // Reset the form
        setFormData({
            carrera_id: '',
            codigo: '',
            nombre: '',
            descripcion: '',
            anio: '',
            estado: ''
        });
    } catch (error) {
        console.error('Error al registrar plan de estudio:', error);
    }
};

    const getAños = () => {
        const currentYear = new Date().getFullYear();
        return Array.from(
            {length: currentYear - 2000 + 1}, 
            (_, i) => currentYear - i
        );
    };

    const estadosOptions = [
        { value: 'ACTIVO', label: 'Activo' },
        { value: 'INACTIVO', label: 'Inactivo' },
        { value: 'EN REVISIÓN', label: 'En Revisión' }
    ];

    return (
        <div>
            <h2>Registrar Plan de Estudio</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Carrera:</label>
                    <select
                        name="carrera_id"
                        value={formData.carrera_id}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione Carrera...</option>
                        {carreras?.map((carrera) => (
                            <option 
                                key={carrera.carrera_id}  // Use carrera_id instead of id
                                value={carrera.carrera_id}  // Use carrera_id as the value
                            >
                                {carrera.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.carrera_id && <p className="error">{errors.carrera_id}</p>}
                </div>
                
                <div>
                    <label>Código del Plan:</label>
                    <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                    />
                    {errors.codigo && <p className="error">{errors.codigo}</p>}
                </div>
                
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    {errors.nombre && <p className="error">{errors.nombre}</p>}
                </div>
                
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                    />
                </div>
                
                <div>
                    <label>Año:</label>
                    <select
                        name="anio"
                        value={formData.anio}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione Año...</option>
                        {getAños().map((año) => (
                            <option key={año} value={año}>
                                {año}
                            </option>
                        ))}
                    </select>
                    {errors.anio && <p className="error">{errors.anio}</p>}
                </div>
                
                <div>
                    <label>Estado:</label>
                    <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione Estado...</option>
                        {estadosOptions.map((estado) => (
                            <option key={estado.value} value={estado.value}>
                                {estado.label}
                            </option>
                        ))}
                    </select>
                    {errors.estado && <p className="error">{errors.estado}</p>}
                </div>
                
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default PlanEstudioForm;