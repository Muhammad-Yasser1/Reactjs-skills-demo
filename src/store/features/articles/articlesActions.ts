import { articleActions } from './articlesSlice';
import { IArticleToStore } from './../../../shared/interfaces/Article.interface';
import { Article } from './../../../shared/models/Article.model';
import { Dispatch } from '@reduxjs/toolkit';
import * as articlesAPI from './articlesAPI';

export const fetchAllArticles = () => async (dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	const articles: IArticleToStore[] = await articlesAPI.fetchAll(dispatch);
	dispatch(articleActions.initArticles(articles));
	return articles;
};

export const fetchArticle = (id: string) => async (dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	const article: IArticleToStore = await articlesAPI.fetchOne(id, dispatch);
	dispatch(articleActions.getArticle(article));
	return article;
};

export const createArticle = (newArticle: Article) => async (dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	const article: IArticleToStore | null = await articlesAPI.postArticle(newArticle, dispatch);
	dispatch(articleActions.addArticle(article));
	return article;
};

export const editArticle =
	({ id, newArticle }: { id: string; newArticle: Article }) =>
	async (dispatch: Dispatch) => {
		dispatch(articleActions.setLoading(true));
		const article: IArticleToStore = await articlesAPI.putArticle(id, newArticle, dispatch);
		dispatch(articleActions.editArticle(article));
		return article;
	};

export const deleteArticle = (article: IArticleToStore) => async (dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	const deletedArticle: IArticleToStore | null = await articlesAPI.deleteOne(article, dispatch);
	dispatch(articleActions.removeArticle(deletedArticle));
	return deletedArticle;
};
