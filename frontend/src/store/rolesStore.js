// store/rolesStore.js
import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const useRolStore = create((set) => ({
    roles: [], // Corregido el nombre de la variable
    formData: {
        nombre: '',
        descripcion: ''
    },

    fetchRoles: async () => {
        await handleRequest(
            () => api.get('/roles'),
            (data) => set({ roles: data })
        );
    },

    addRole: async (role) => {
        return await handleRequest(
            () => api.post('/roles', role),
            (data) => set((state) => ({
                roles: [...state.roles, data]
            }))
        );
    },

    updateRole: async (id, updateData) => {
        return await handleRequest(
            () => api.put(`/roles/${id}`, updateData),
            (data) => set((state) => ({
                roles: state.roles.map((role) =>
                    role.rol_id === id ? { ...role, ...data } : role
                )
            }))
        );
    },

    deleteRole: async (id) => {
        await handleRequest(
            () => api.delete(`/roles/${id}`),
            () => set((state) => ({
                roles: state.roles.filter((role) => role.rol_id !== id)
            }))
        );
    },

    updateField: (field, value) => {
        set((state) => ({
            formData: {
                ...state.formData,
                [field]: value
            }
        }));
    },

    resetForm: () => {
        set({
            formData: {
                nombre: '',
                descripcion: ''
            }
        });
    }
}));

export default useRolStore;