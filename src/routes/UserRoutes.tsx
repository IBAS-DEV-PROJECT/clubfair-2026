import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedUserLayout from "../layouts/ProtectedUserLayout";
import { LandingPage, MyPage, SignUpPage, LoginPage, TestPage } from "../pages";
import { useUserAuthStore } from "../stores/useUserAuthStore"

const UserRoutes = () => {
    const init = useUserAuthStore((state) => state.init);

    useEffect(() => {
        init();
    }, []);

    return (
        <Routes>
            {/* 공개 페이지 */}
            <Route path="/" element={<LandingPage />}/>
            <Route path="/signup" element={<SignUpPage />}/>
            <Route path="/login" element={<LoginPage />}/>

            {/* 로그인 필요 (테스트 미완료도 접근 가능) */}
            <Route element={<ProtectedUserLayout requiredTest={false} />}>
                <Route path="/test" element={<TestPage />} />
            </Route>

            {/* 로그인 + 테스트 완료 필요 */}
            <Route element={<ProtectedUserLayout />}>
                <Route path="/my" element={<MyPage />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;