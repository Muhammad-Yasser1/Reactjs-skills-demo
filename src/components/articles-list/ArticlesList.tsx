import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store';
import './ArticlesList.scss';

const ArticlesList = () => {
	const articles = useAppSelector((state) => state.articlesReducer.articles);
	const mode = useAppSelector((state) => state.userReducer.mode);
	return (
		<div className='ArticlesList row justify-content-around'>
			{articles.map((article) => {
				return (
					<div
						className='card text-white col-10 col-sm-8 col-md-6 col-lg-4'
						key={article.id}
					>
						<NavLink
							to={{
								pathname:
									mode === 'Reader'
										? `/articles/${article.id}`
										: `/articles/${article.id}/edit`,
							}}
						>
							<img
								className='card-img-top'
								src={require(`../../assets/images/${article.image}`)}
								alt='Article'
							/>
							<div className='title'>{article.title}</div>
							<div className='overlay'></div>
							<div className='author'>
								{article.updated_at || article.created_at}{' '}
								{article.author && `by ${article.author}`}
							</div>
						</NavLink>
					</div>
				);
			})}
		</div>
	);
};

export default ArticlesList;
