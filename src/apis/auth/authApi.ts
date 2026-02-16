import { createClient } from '@supabase/supabase-js';
import type { Gender } from '../../constants';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase env is missing: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ===== 타입 정의 =====
export interface LoginParams {
  phone: string;
  password: string;
}

export interface SignUpParams {
  name: string;
  phone: string;
  password: string;
  instagram_id: string;
  gender: Gender;
  privacy_consent: boolean;
}

// ===== API 함수 =====
export async function login(params: LoginParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    phone: params.phone,
    password: params.password,
  });

  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function signup(params: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    phone: params.phone,
    password: params.password,
    options: {
      data: {
        name: params.name,
        instagram_id: params.instagram_id,
        gender: params.gender,
        privacy_consent: params.privacy_consent,
      },
    },
  });

  if (error) throw error;
  return data;
}
