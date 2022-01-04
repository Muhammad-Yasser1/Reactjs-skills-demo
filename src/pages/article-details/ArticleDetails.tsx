import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchArticle } from '../../store/features/articles/articlesActions';
import { articleActions } from '../../store/features/articles/articlesSlice';
import './ArticleDetails.scss';

const ArticleDetails = () => {
	const params = useParams();
	const article = useAppSelector((state) => state.articlesReducer.currentArticle);
	const wasArticleFound = useAppSelector((state) => state.articlesReducer.wasArticleFound);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (!wasArticleFound) {
			dispatch(articleActions.wasArticleFound(true)); // reset
			navigate('/home');
		}
	}, [wasArticleFound, dispatch, navigate]);

	useEffect(() => {
		dispatch(fetchArticle(params.id as string));
	}, [dispatch, params.id]);
	return (
		<div className='Article row'>
			<div className='col-lg-4 col-md-6 col-9 Article__image'>
				{article.image && (
					<img className='img-fluid' src={require(`../../assets/images/${article.image}`)} alt='Article' />
				)}
			</div>
			<div className='col-11 col-md-6 col-lg-8 Article__text-container'>
				<h1 className='Article__title'>{article.title}</h1>
				<div className='Article__meta'>
					<h6>
						by {article.author} -- {article.updated_at}
					</h6>
				</div>
				<hr />
				<div className='Article__content card'>
					<div className='card-body'>
						<blockquote className='blockquote'>
							<p>
								{article.content} {article.content} {article.content} {article.content}{' '}
								{article.content} {article.content} {article.content} {article.content}{' '}
								{article.content} {article.content}
							</p>
						</blockquote>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArticleDetails;
