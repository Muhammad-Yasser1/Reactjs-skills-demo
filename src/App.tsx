import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import EditArticle from './pages/edit-article/EditArticle';
import ArticleDetails from './pages/article-details/ArticleDetails';
import CreateArticle from './pages/create-article/CreateArticle';
import AuthUser from './pages/auth-user/AuthUser';
import MainLayout from './layouts/main-layout/MainLayout';
import { useAppDispatch } from './store';
import { useEffect } from 'react';
import { fetchAllArticles } from './store/features/articles/articlesThunks';
import PageNotFound from './pages/page-not-found/PageNotFound';

const App = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchAllArticles());
	}, [dispatch]);
	return (
		<Routes>
			<Route path={'/'} element={<MainLayout />}>
				<Route path={''} element={<Navigate to={'/home'} />} />
				<Route path={'home'} element={<Home />} />
				<Route path={'articles/:id/edit'} element={<EditArticle />} />
				<Route path={'articles/:id'} element={<ArticleDetails />} />
				<Route path={'articles/create'} element={<CreateArticle />} />
			</Route>
			<Route path={'/auth'} element={<AuthUser />} />
			<Route path={'/page-not-found'} element={<PageNotFound />} />
			<Route path={'*'} element={<Navigate to={'/page-not-found'} />} />
		</Routes>
	);
};

export default App;
