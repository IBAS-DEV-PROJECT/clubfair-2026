import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../libs/supabase';

interface AuthState {
    user: User | null; // 로그인한 유저 정보 (없으면 null)
    hasCompletedTest: boolean; // user table에 answer가 1개 이상이면
    loading: boolean; // 처음 세션 확인 + DB 조회 끝날 때까지 false
}

const useAuth = (): AuthState => {
    const [user, setUser] = useState<User | null>(null);
    const [hasCompletedTest, setHasCompletedTest] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                const { data } = await supabase
                    .from('users')
                    .select('answers')
                    .eq('id', currentUser.id)
                    .single();

                setHasCompletedTest((data?.answers?.length ?? 0) > 0);
            }

            setLoading(false);
        };

        init();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                const { data } = await supabase
                .from('users')
                .select('answers')
                .eq('id', currentUser.id)
                .single();

            setHasCompletedTest((data?.answers?.length ?? 0) > 0);
            } else {
                setHasCompletedTest(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return { user, hasCompletedTest, loading };
};

export default useAuth;