import { createPortal } from 'react-dom';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FloatingButton from '../../components/floating-button/FloatingButton';
import MainFooter from '../../components/main-footer/MainFooter';
import MainNavbar from '../../components/main-navbar/MainNavbar';
import Modal from '../../components/modal/Modal';
import ArticleDetails from '../../pages/article-details/ArticleDetails';
import CreateArticle from '../../pages/create-article/CreateArticle';
import EditArticle from '../../pages/edit-article/EditArticle';
import Home from '../../pages/home/Home';
import { useAppSelector } from '../../store';
import './MainLayout.scss';

const MainLayout = () => {
	const mode = useAppSelector((state) => state.userReducer.mode);
	const location = useLocation();

	return (
		<>
			<MainNavbar mode={mode} />
			{mode !== 'Reader' && <FloatingButton mode={mode} />}
			{createPortal(<Modal mode={mode} />, document.getElementById('modal-container') as HTMLDivElement)}
			<TransitionGroup>
				<CSSTransition key={location.pathname} classNames='fade' timeout={400}>
					<main className='container-fluid'>
						<Routes location={location}>
							<Route path={'/'} element={<Navigate to={'/home'} />} />
							<Route path={'/home'} element={<Home />} />
							<Route
								path={'/articles/create'}
								element={mode === 'Admin' ? <CreateArticle /> : <Navigate to={'/home'} />}
							/>
							<Route
								path={'/articles/:id/edit'}
								element={mode === 'Admin' ? <EditArticle /> : <Navigate to={'/home'} />}
							/>
							<Route path={'/articles/:id'} element={<ArticleDetails />} />
							<Route path={'*'} element={<Navigate to={'/page-not-found'} />} />
						</Routes>
					</main>
				</CSSTransition>
			</TransitionGroup>
			<MainFooter />
		</>
	);
};

export default MainLayout;
