import { Navigate, Route, Routes } from 'react-router-dom';
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
	const articlesLoading = useAppSelector((state) => state.articlesReducer.loading);
	const userLoading = useAppSelector((state) => state.userReducer.loading);
	const isAuth = useAppSelector((state) => state.userReducer.isAuth);
	const loading = articlesLoading || userLoading;
	const token = useAppSelector((state) => state.userReducer.token);

	useEffect(() => {
		setUpNotifications({
			defaultProps: {
				position: 'top-right',
				dismissible: true,
			},
		});
		if (token) {
			dispatch(fetchAllArticles());
		}
	}, [dispatch, token]);

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
			<Routes>
				<Route path={'/*'} element={isAuth ? <MainLayout /> : <Navigate to='/auth' />} />
				<Route path={'/auth'} element={!isAuth ? <AuthUser /> : <Navigate to='/home' />} />
				<Route path={'/page-not-found'} element={<PageNotFound />} />
			</Routes>
		</>
	);
};

export default App;
