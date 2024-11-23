import { create } from 'zustand'
import axios from 'axios'

const useAsistenciaStore = create((set) => ({
  asistencias: [],
  loading: false,
  error: null,

  registrarAsistencia: async (asistenciaData) => {
    set({ loading: true })
    try {
      const response = await axios.post('/api/asistencias', asistenciaData)
      set(state => ({ 
        asistencias: [...state.asistencias, response.data],
        loading: false 
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  obtenerAsistenciasPorCurso: async (cursoId) => {
    set({ loading: true })
    try {
      const response = await axios.get(`/api/asistencias/curso/${cursoId}`)
      set({ asistencias: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  }
}))

export default useAsistenciaStore