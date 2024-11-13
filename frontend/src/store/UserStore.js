import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  users: [],
  addUser: async (user) => {
    try {
      const response = await axios.post('http://localhost:3001/usuario', user);
      set((state) => ({
        users: [...state.users, response.data],
      }));
    } catch (error) {
      console.log('Error adding user:', error.message);
    }
  },
  fetchUsers: async () => {
    try {
      const response = await axios.get('http://localhost:3001/usuario');
      set({ users: response.data });
    } catch (error) {
      console.log('Error fetching users:', error.message);
    }
  },
  deleteUser: async (id) => {
    try {
      await axios.delete(`http://localhost:3001/usuario/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.usuario_id !== id),
      }));
    } catch (error) {
      console.log('Error deleting user:', error.message);
    }
  },
  updateUser: async (id, updateData) => {
    try {
      const response = await axios.put(`http://localhost:3001/usuario/${id}`, updateData);
      set((state) => ({
        users: state.users.map((user) =>
          user.usuario_id === id ? response.data : user
        ),
      }));
    } catch (error) {
      console.log('Error updating user:', error.message);
    }
  },
}));

export default useUserStore;