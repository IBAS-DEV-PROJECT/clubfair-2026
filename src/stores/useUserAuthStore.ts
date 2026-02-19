import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../apis/auth/authApi";

interface UserAuthStore {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean; // 처음 세션 확인 + DB 조회 끝날 때까지 false
    init: () => void;
}

export const useUserAuthStore = create<UserAuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,

    init: () => {
        // 로컬 스토리지에서 읽어오기
        supabase.auth.getSession().then(({ data: { session } }) => {
            set({
                user: session?.user ?? null,
                isAuthenticated: !! sessionStorage?.user,
                loading: false,
            })
        })
    }
}))