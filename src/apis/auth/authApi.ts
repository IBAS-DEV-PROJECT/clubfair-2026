import type { Gender } from '../../constants';
import { supabase } from '../../libs/supabase';

// ===== 타입 정의 =====
export interface LoginParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  email: string;
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
    email: params.email,
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
    email: params.email,
    password: params.password,
    options: {
      data: {
        name: params.name,
        phone: params.phone,
        instagram_id: params.instagram_id,
        gender: params.gender,
        privacy_consent: params.privacy_consent,
      },
    },
  });

  if (error) throw error;
  return data;
}
