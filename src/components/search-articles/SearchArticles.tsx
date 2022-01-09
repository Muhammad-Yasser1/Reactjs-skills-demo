import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { articleActions } from '../../store/features/articles/articlesSlice';
import './SearchArticle.scss';

let debounceTimeout: ReturnType<typeof setTimeout>;

interface Props {
	debounceTime: number;
}

const SearchArticles = ({ debounceTime }: Props) => {
	const [searchText, setSearchText] = useState('');
	const articles = useAppSelector((state) => state.articlesReducer.articles);
	const dispatch = useAppDispatch();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}
		debounceTimeout = setTimeout(() => {
			setSearchText(e.target.value);
		}, debounceTime);
	};

	useEffect(() => {
		if (articles.length) {
			dispatch(articleActions.searchArticles(searchText));
		}
	}, [searchText, articles, dispatch]);

	return (
		<div className='SearchArticles'>
			<input
				className='form-control'
				type='search'
				placeholder='Search titles'
				aria-label='Search articles'
				onChange={handleChange}
			/>
		</div>
	);
};

export default SearchArticles;
