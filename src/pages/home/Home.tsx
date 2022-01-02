import { useEffect } from 'react';
import ArticlesList from '../../components/articles-list/ArticlesList';
import { useAppDispatch } from '../../store';
import { fetchAllArticles } from '../../store/features/articles/articlesActions';

const Home = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchAllArticles());
	}, [dispatch]);
	return (
		<>
			<ArticlesList />
		</>
	);
};

export default Home;
