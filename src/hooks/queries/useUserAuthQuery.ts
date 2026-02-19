import { useQuery } from "@tanstack/react-query";
import { useUserAuthStore } from "../../stores/useUserAuthStore"
import { supabase } from "../../libs/supabase";

const useUserQuery = () => {
    const { user } = useUserAuthStore();

    return useQuery({
        queryKey: ['user', user?.id],
        queryFn: async () => {
            const { data } = await supabase
                .from('users')
                .select('answers')
                .eq('id', user!.id)
                .single();
            return data;
        },
        enabled: !!user, // 로그인 상태일 때만 실행
    })
}

export default useUserQuery;