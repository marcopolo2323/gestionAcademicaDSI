import { create } from 'zustand';
import { api, handleRequest } from '../utils/api';

const usePlanEstudioStore = create((set) => ({
  planes: [],

  fetchPlanes: async () => {
    await handleRequest(() => api.get('/planestudio'), (data) =>
      set({ planes: data })
    );
  }, 

  addPlan: async (planData) => {
    // Add date handling for fecha_inicio and fecha_fin
    const completeData = {
      ...planData,
      fecha_inicio: new Date(),
      // Optional: You might want to calculate fecha_fin based on some logic
      fecha_fin: null
    };

    return await handleRequest(() => api.post('/planestudio', completeData), (data) =>
      set((state) => ({
        planes: [...state.planes, data],
      }))
    );
  },

  updatePlan: async (id, updateData) => {
    // Asegúrate de que las fechas estén en el formato correcto
    const completeData = {
        ...updateData,
        fecha_inicio: updateData.fecha_inicio ? new Date(updateData.fecha_inicio).toISOString() : null,
        fecha_fin: updateData.fecha_fin ? new Date(updateData.fecha_fin).toISOString() : null,
    };

    return await handleRequest(() => api.put(`/planestudio/${id}`, completeData), (data) =>
        set((state) => ({
            planes: state.planes.map((plan) =>
                plan.plan_id === id ? { ...plan, ...data } : plan
            ),
        }))
    );
},

  deletePlan: async (id) => {
    await handleRequest(() => api.delete(`/planestudio/${id}`), () =>
      set((state) => ({
        planes: state.planes.filter((plan) => plan.plan_id !== id),
      }))
    );
  },
}));

export default usePlanEstudioStore;