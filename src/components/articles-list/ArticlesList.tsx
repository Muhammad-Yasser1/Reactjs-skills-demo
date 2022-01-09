import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store';
import SearchArticles from '../search-articles/SearchArticles';
import SortArticles from '../sort-articles/SortArticles';
import './ArticlesList.scss';

const ArticlesList = () => {
	const articles = useAppSelector((state) => state.articlesReducer.articles);
	const searchedArticles = useAppSelector((state) => state.articlesReducer.searchedArticles);
	const mode = useAppSelector((state) => state.userReducer.mode);

	return (
		<div className='ArticlesList row justify-content-around'>
			<div className='col-12 ArticlesList__ops-row'>
				<SearchArticles debounceTime={500} />
				<SortArticles articles={articles} />
			</div>
			{searchedArticles.map((article) => {
				return (
					<div className='card col-10 col-sm-8 col-md-6 col-lg-4' key={article.id}>
						<NavLink
							to={{
								pathname:
									mode === 'Reader' ? `/articles/${article.id}` : `/articles/${article.id}/edit`,
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
								{article.updated_at || article.created_at} {article.author && `by ${article.author}`}
							</div>
						</NavLink>
					</div>
				);
			})}
		</div>
	);
};

export default ArticlesList;
