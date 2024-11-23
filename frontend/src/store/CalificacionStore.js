import { create } from 'zustand'
import axios from 'axios'

const useCalificacionStore = create((set) => ({
  calificaciones: [],
  loading: false,
  error: null,

  fetchCalificaciones: async (estudianteId) => {
    set({ loading: true })
    try {
      const response = await axios.get(`/api/calificaciones/${estudianteId}`)
      set({ calificaciones: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  registrarCalificacion: async (calificacionData) => {
    try {
      const response = await axios.post('/api/calificaciones', calificacionData)
      set(state => ({ calificaciones: [...state.calificaciones, response.data] }))
    } catch (error) {
      set({ error: error.message })
    }
  }
}))

export default useCalificacionStore