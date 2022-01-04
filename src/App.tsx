import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import EditArticle from './pages/edit-article/EditArticle';
import ArticleDetails from './pages/article-details/ArticleDetails';
import CreateArticle from './pages/create-article/CreateArticle';
import AuthUser from './pages/auth-user/AuthUser';
import MainLayout from './layouts/main-layout/MainLayout';
import { useAppDispatch, useAppSelector } from './store';
import { useEffect } from 'react';
import { fetchAllArticles } from './store/features/articles/articlesActions';
import PageNotFound from './pages/page-not-found/PageNotFound';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import NotificationsSystem, { atalhoTheme, dismissNotification, setUpNotifications } from 'reapop';
const App = () => {
	const dispatch = useAppDispatch();
	const notifications = useAppSelector((state) => state.notifications);
	const articles = useAppSelector((state) => state.articlesReducer.articles);
	const loading = useAppSelector((state) => state.articlesReducer.loading);
	const mode = useAppSelector((state) => state.userReducer.mode);
	const location = useLocation();
	useEffect(() => {
		setUpNotifications({
			defaultProps: {
				position: 'top-right',
				dismissible: true,
			},
		});
		if (!articles.length) {
			dispatch(fetchAllArticles());
		}
	}, [dispatch]);
	useEffect(() => {
		if (loading) {
			nprogress.start();
		} else {
			nprogress.done();
		}
	}, [loading]);

	return (
		<>
			<NotificationsSystem
				notifications={notifications}
				dismissNotification={(id) => dispatch(dismissNotification(id))}
				theme={atalhoTheme}
			/>
			<Routes location={location}>
				<Route path={'/'} element={<MainLayout location={location} />}>
					<Route path={''} element={<Navigate to={'/home'} />} />
					<Route path={'home'} element={<Home />} />
					<Route path={'articles/:id'} element={<ArticleDetails />} />
					<Route
						path={'articles/create'}
						element={mode === 'Admin' ? <CreateArticle /> : <Navigate to={'/home'} />}
					/>
					<Route
						path={'articles/:id/edit'}
						element={mode === 'Admin' ? <EditArticle /> : <Navigate to={'/home'} />}
					/>
				</Route>
				<Route path={'/auth'} element={<AuthUser />} />
				<Route path={'/page-not-found'} element={<PageNotFound />} />
				<Route path={'*'} element={<Navigate to={'/page-not-found'} />} />
			</Routes>
		</>
	);
};

export default App;
