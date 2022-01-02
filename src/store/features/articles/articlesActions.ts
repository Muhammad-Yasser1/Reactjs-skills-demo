import { articleActions } from './articlesSlice';
import { IArticleToStore } from './../../../shared/interfaces/Article.interface';
import { Article } from './../../../shared/models/Article.model';
import { Dispatch } from '@reduxjs/toolkit';
import * as articlesAPI from './articlesAPI';

export const fetchAllArticles = () => async (dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	const articles: IArticleToStore[] = await articlesAPI.fetchAll();
	dispatch(articleActions.initArticles(articles));
	return articles;
};

export const fetchArticle = (id: string) => async (dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	const article: IArticleToStore = await articlesAPI.fetchOne(id);
	dispatch(articleActions.getArticle(article));
	return article;
};

export const createArticle = (newArticle: Article) => async (dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	const article: IArticleToStore = await articlesAPI.postArticle(newArticle);
	dispatch(articleActions.addArticle(article));
	return article;
};

export const editArticle =
	({ id, newArticle }: { id: string; newArticle: Article }) =>
	async (dispatch: Dispatch) => {
		dispatch(articleActions.setLoading(true));
		const article: IArticleToStore = await articlesAPI.putArticle(id, newArticle);
		dispatch(articleActions.editArticle(article));
		return article;
	};

export const deleteArticle = (id: string) => async (dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	const article: IArticleToStore = await articlesAPI.deleteOne(id);
	dispatch(articleActions.getArticle(article));
	return article;
};
