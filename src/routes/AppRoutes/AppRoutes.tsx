import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../store';

const AuthUser = lazy(() => import('../../pages/auth-user/AuthUser'));
const MainLayout = lazy(() => import('../../layouts/main-layout/MainLayout'));
const PageNotFound = lazy(
    () => import('../../pages/page-not-found/PageNotFound')
);

function AppRoutes() {
    const isAuth = useAppSelector((state) => state.userReducer.isAuth);

    return (
        <div>
            <Routes>
                <Route
                    path={'/*'}
                    element={
                        isAuth ? (
                            <Suspense fallback="">
                                <MainLayout />
                            </Suspense>
                        ) : (
                            <Navigate to="/auth" />
                        )
                    }
                />
                <Route
                    path="/auth"
                    element={
                        !isAuth ? (
                            <Suspense fallback="">
                                <AuthUser />
                            </Suspense>
                        ) : (
                            <Navigate to="/home" />
                        )
                    }
                />
                <Route
                    path="/page-not-found"
                    element={
                        <Suspense fallback="">
                            <PageNotFound />
                        </Suspense>
                    }
                />
            </Routes>
        </div>
    );
}

export default AppRoutes;
