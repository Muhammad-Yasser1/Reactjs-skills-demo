import { lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import FloatingButton from '../../components/floating-button/FloatingButton';
import MainFooter from '../../components/main-footer/MainFooter';
import MainNavbar from '../../components/main-navbar/MainNavbar';
import Modal from '../../components/modal/Modal';
import AnimatedRoutes from '../../routes/AnimatedRoutes/AnimatedRoutes';
// import EditArticle from '../../pages/edit-article/EditArticle';
import { useAppSelector } from '../../store';
import './MainLayout.scss';

import Home from '../../pages/home/Home';

const EditArticle = lazy(() => import('../../pages/edit-article/EditArticle'));
const CreateArticle = lazy(
    () => import('../../pages/create-article/CreateArticle')
);
const ArticleDetails = lazy(
    () => import('../../pages/article-details/ArticleDetails')
);

function MainLayout() {
    const mode = useAppSelector((state) => state.userReducer.mode);
    const location = useLocation();

    return (
        <>
            <MainNavbar mode={mode} />
            {mode !== 'Reader' && <FloatingButton />}
            {createPortal(
                <Modal mode={mode} />,
                document.getElementById('modal-container') as HTMLDivElement
            )}

            <AnimatedRoutes>
                <main className="container-fluid">
                    <Routes location={location}>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/articles/create"
                            element={
                                mode === 'Admin' ? (
                                    <Suspense fallback="">
                                        <CreateArticle />
                                    </Suspense>
                                ) : (
                                    <Navigate to="/home" />
                                )
                            }
                        />
                        <Route
                            path="/articles/:id/edit"
                            element={
                                mode === 'Admin' ? (
                                    <Suspense fallback="">
                                        <EditArticle />
                                    </Suspense>
                                ) : (
                                    <Navigate to="/home" />
                                )
                            }
                        />
                        <Route
                            path="/articles/:id"
                            element={
                                <Suspense fallback="">
                                    <ArticleDetails />
                                </Suspense>
                            }
                        />
                        <Route
                            path="*"
                            element={<Navigate to="/page-not-found" />}
                        />
                    </Routes>
                </main>
            </AnimatedRoutes>

            <MainFooter />
        </>
    );
}

export default MainLayout;
