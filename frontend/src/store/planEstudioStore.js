import { create } from 'zustand'

// stores/planEstudioStore.js
export const usePlanEstudioStore = create((set) => ({
    formData: {
      año: '',
      vigente: true
    },
    setFormData: (data) => set({ formData: data }),
    updateField: (field, value) => 
      set((state) => ({
        formData: { ...state.formData, [field]: value }
      })),
    resetForm: () => set({
      formData: {
        año: '',
        vigente: true
      }
    })
  }));