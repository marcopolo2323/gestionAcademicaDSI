// stores/rolesStore.js
import { create } from 'zustand'

export const useRolesStore = create((set) => ({
    formData: {
      nombre: '',
      descripcion: ''
    },
    setFormData: (data) => set({ formData: data }),
    updateField: (field, value) => 
      set((state) => ({
        formData: { ...state.formData, [field]: value }
      })),
    resetForm: () => set({
      formData: {
        nombre: '',
        descripcion: ''
      }
    })
  }));