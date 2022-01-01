import { IArticleToStore } from './../../../shared/interfaces/Article.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Articles = IArticleToStore[];

interface ArticleState {
	articles: Articles;
	loading: boolean;
}

const initialState: ArticleState = {
	articles: [],
	loading: false,
};

const articlesSlice = createSlice({
	name: 'Article',
	initialState,
	reducers: {
		initArticles: (state, action: PayloadAction<Articles>) => {
			state.loading = false;
			state.articles = action.payload;
		},
		getArticle: (state, action) => {},
		addArticle: (state, action) => {},
		editArticle: (state, action) => {},
		removeArticle: (state, action) => {},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
	extraReducers: (builder) => {
		// builder
		// 	.addCase(fetchAllArticles.pending, (state, action) => {
		// 		state.loading = true;
		// 	})
		// 	.addCase(fetchAllArticles.fulfilled, (state, action: payloadAction<Articles>) => {
		// 		state.loading = false;
		// 		state.articles = action.payload;
		// 	});
		// builder
		// 	.addCase(createArticle.pending, (state, action) => {
		// 		state.loading = true;
		// 	})
		// 	.addCase(createArticle.fulfilled, (state, action: PayloadAction<IArticleToStore>) => {
		// 		state.loading = false;
		// 		state.articles.push(action.payload);
		// 	});
	},
});
export const articleActions = articlesSlice.actions;
export default articlesSlice.reducer;
