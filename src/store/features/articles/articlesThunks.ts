import { articleActions } from './articlesSlice';
import { IArticleToStore } from './../../../shared/interfaces/Article.interface';
import { Article } from './../../../shared/models/Article.model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as articlesAPI from './articlesAPI';

export const fetchAllArticles = createAsyncThunk('articles/fetchAllArticles', async (_, { dispatch }) => {
	const articles: IArticleToStore[] = await articlesAPI.fetchAll();
	dispatch(articleActions.initArticles(articles));
	dispatch(articleActions.setLoading(true));
	return articles;
});

export const createArticle = createAsyncThunk('articles/createArticle', async (newArticle: Article) => {
	const article: IArticleToStore = await articlesAPI.postArticle(newArticle);
	return article;
});
