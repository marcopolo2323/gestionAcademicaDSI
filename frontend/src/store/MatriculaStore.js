import { create } from 'zustand'
import axios from 'axios'

const useMatriculaStore = create((set) => ({
  matriculas: [], // Aseguramos que inicialmente sea un array vacío
  loading: false,
  error: null,

  fetchMatriculas: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('/api/matriculas')
      // Aseguramos que siempre guardamos un array
      const data = Array.isArray(response.data) ? response.data : response.data.data || []
      set({ matriculas: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false, matriculas: [] })
    }
  },

  createMatricula: async (matriculaData) => {
    set({ error: null })
    try {
      const response = await axios.post('/api/matriculas', matriculaData)
      set(state => ({ 
        matriculas: [...state.matriculas, response.data]
      }))
      return response.data
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  updateMatricula: async (id, matriculaData) => {
    set({ error: null })
    try {
      const response = await axios.put(`/api/matriculas/${id}`, matriculaData)
      set(state => ({
        matriculas: state.matriculas.map(m => 
          m.matricula_id === id ? response.data : m
        )
      }))
      return response.data
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  deleteMatricula: async (id) => {
    set({ error: null })
    try {
      await axios.delete(`/api/matriculas/${id}`)
      set(state => ({
        matriculas: state.matriculas.filter(m => m.matricula_id !== id)
      }))
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  }
}))

export default useMatriculaStore