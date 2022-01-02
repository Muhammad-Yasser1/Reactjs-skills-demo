// createAsyncThunk version of the articlesActions file

import { articleActions } from './articlesSlice';
import { IArticleToStore } from './../../../shared/interfaces/Article.interface';
import { Article } from './../../../shared/models/Article.model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as articlesAPI from './articlesAPI';

export const fetchAllArticles = createAsyncThunk('articles/fetchArticles', async (_, { dispatch }) => {
	const articles: IArticleToStore[] = await articlesAPI.fetchAll();
	dispatch(articleActions.initArticles(articles));
	dispatch(articleActions.setLoading(true));
	return articles;
});

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (id: string, { dispatch }) => {
	const article: IArticleToStore = await articlesAPI.fetchOne(id);
	dispatch(articleActions.getArticle(article));
	dispatch(articleActions.setLoading(true));
	return article;
});

export const createArticle = createAsyncThunk('articles/createArticle', async (newArticle: Article, { dispatch }) => {
	const article: IArticleToStore = await articlesAPI.postArticle(newArticle);
	dispatch(articleActions.addArticle(article));
	dispatch(articleActions.setLoading(true));
	return article;
});

export const editArticle = createAsyncThunk(
	'articles/editArticle',
	async ({ id, newArticle }: { id: string; newArticle: Article }, { dispatch }) => {
		const article: IArticleToStore = await articlesAPI.putArticle(id, newArticle);
		dispatch(articleActions.editArticle(article));
		dispatch(articleActions.setLoading(true));
		return article;
	}
);

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (id: string, { dispatch }) => {
	const article: IArticleToStore = await articlesAPI.deleteOne(id);
	dispatch(articleActions.getArticle(article));
	dispatch(articleActions.setLoading(true));
	return article;
});
