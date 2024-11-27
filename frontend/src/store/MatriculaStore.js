import { create } from 'zustand'
import { api } from '../utils/api';

const useMatriculaStore = create((set) => ({
  matriculas: [], 
  loading: false,
  error: null,

  fetchMatriculas: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get('/matricula')
      const data = Array.isArray(response.data) ? response.data : response.data.data || []
      set({ matriculas: data, loading: false })
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message, 
        loading: false, 
        matriculas: [] 
      })
    }
  },

  createMatricula: async (matriculaData) => {
    set({ error: null })
    try {
      const response = await api.post('/matricula', matriculaData)
      set(state => ({ 
        matriculas: [...state.matriculas, response.data]
      }))
      return response.data
    } catch (error) {
      set({ error: error.response?.data?.message || error.message })
      throw error
    }
  },

  updateMatricula: async (id, matriculaData) => {
    set({ error: null })
    try {
      const response = await api.put(`/matricula/${id}`, matriculaData)
      set(state => ({
        matriculas: state.matriculas.map(m => 
          m.matricula_id === id ? response.data : m
        )
      }))
      return response.data
    } catch (error) {
      set({ error: error.response?.data?.message || error.message })
      throw error
    }
  },

  deleteMatricula: async (id) => {
    set({ error: null })
    try {
      await api.delete(`/matricula/${id}`)
      set(state => ({
        matriculas: state.matriculas.filter(m => m.matricula_id !== id)
      }))
    } catch (error) {
      set({ error: error.response?.data?.message || error.message })
      throw error
    }
  }
}))

export default useMatriculaStore