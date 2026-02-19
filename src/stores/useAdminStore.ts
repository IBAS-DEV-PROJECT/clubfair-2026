import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminRole } from '../constants';

interface AdminState {
  role: AdminRole | null;
  isAuthenticated: boolean;
  setRole: (role: AdminRole) => void;
  clearAuth: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      role: null,
      isAuthenticated: false,
      setRole: (role) =>
        set({
          role,
          isAuthenticated: true,
        }),
      clearAuth: () =>
        set({
          role: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'admin-auth', // localStorage key
    },
  ),
);
