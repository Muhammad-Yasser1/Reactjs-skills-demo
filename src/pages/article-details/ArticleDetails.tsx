import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store';
import './ArticleDetails.scss';

const ArticleDetails = () => {
	const params = useParams();
	const articles = useAppSelector((state) => state.articlesReducer.articles);

	const article = articles.find((article) => article.id === params.id);
	if (!article) {
		return <Navigate to='/home' />;
	}
	return (
		<div className='Article row'>
			<div className='col-lg-4 col-md-6 col-9 mx-auto'>
				{article.image && (
					<img
						className='img-fluid'
						src={require(`../../assets/images/${article.image}`)}
						alt='Article'
					/>
				)}
			</div>
			<div className='col-11 col-md-6 col-lg-8 mx-auto my-3 my-lg-0'>
				<h1 className='title'>{article.title}</h1>
				<div className='my-3 mb-4'>
					<h6>
						by {article.author} -- {article.updated_at}
					</h6>
				</div>
				<hr />
				<div className='card bg-transparent border-0'>
					<div className='card-body'>
						<blockquote className='blockquote'>
							<p>{article.content}</p>
						</blockquote>
					</div>
				</div>
				<p>{article.content}</p>
				<p>{article.content}</p>
				<p>{article.content}</p>
				<p>{article.content}</p>
				<p>{article.content}</p>
			</div>
		</div>
	);
};

export default ArticleDetails;
