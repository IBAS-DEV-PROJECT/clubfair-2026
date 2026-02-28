import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../apis/auth/authApi';

interface UserAuthStore {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean; // 처음 세션 확인 + DB 조회 끝날 때까지 true
  init: () => void;
}

export const useUserAuthStore = create<UserAuthStore>((set) => ({
  user: null,
  isAuthenticated: true,
  loading: true,

  init: () => {
    const updateFromSession = (session: { user: User | null } | null) => {
      set({
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
        loading: false,
      });
    };

    // 초기 세션 + 이후 로그인/로그아웃/토큰 갱신 시 스토어 동기화
    supabase.auth.getSession().then(({ data: { session } }) => updateFromSession(session));

    supabase.auth.onAuthStateChange((_event, session) => {
      updateFromSession(session);
    });
  },
}));
