// stores/carreraStore.js
import { create } from 'zustand'

export const useCarreraStore = create((set) => ({
    formData: {
      nombre: '',
      descripcion: '',
      duracion: ''
    },
    setFormData: (data) => set({ formData: data }),
    updateField: (field, value) => 
      set((state) => ({
        formData: { ...state.formData, [field]: value }
      })),
    resetForm: () => set({
      formData: {
        nombre: '',
        descripcion: '',
        duracion: ''
      }
    })
  }));