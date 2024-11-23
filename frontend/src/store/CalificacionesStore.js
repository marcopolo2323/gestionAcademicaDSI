// stores/calificacionStore.js
import { create } from 'zustand'

export const useCalificacionStore = create((set) => ({
    formData: {
      nota: '',
      tipo: '',
      fecha: ''
    },
    setFormData: (data) => set({ formData: data }),
    updateField: (field, value) => 
      set((state) => ({
        formData: { ...state.formData, [field]: value }
      })),
    resetForm: () => set({
      formData: {
        nota: '',
        tipo: '',
        fecha: ''
      }
    })
  }));