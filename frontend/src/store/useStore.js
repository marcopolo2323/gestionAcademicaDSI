import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../utils/api';

const useStore = create(
  persist(
    (set ) => ({
      user: null,
      token: null,
      
      login: (userData) => {
        console.log('🔐 Store login method called with:', userData);
        
        if (!userData || !userData.token) {
          console.error('❌ Invalid user data or missing token');
          throw new Error('Invalid authentication credentials');
        }

        set({ 
          user: userData, 
          token: userData.token 
        });

        // Explicitly set token in axios headers
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

        console.log('✅ User logged in successfully');
        return userData;
      },

      logout: () => {
        console.log('🚪 Logout method called');
        
        set({ 
          user: null, 
          token: null 
        });
        
        delete api.defaults.headers.common['Authorization'];
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token
      })
    }
  )
);

export default useStore;