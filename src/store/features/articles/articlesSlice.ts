import { IArticleToStore } from './../../../shared/interfaces/Article.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Articles = IArticleToStore[];

interface ArticleState {
	articles: Articles;
	currentArticle: IArticleToStore;
	loading: boolean;
}

const initialState: ArticleState = {
	articles: [],
	currentArticle: { id: '', author: '', content: '', title: '', image: '', created_at: '', updated_at: '' },
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
		editArticle: (state, action: PayloadAction<IArticleToStore>) => {
			const removeEditedArticle = state.articles.filter((article) => article.id !== action.payload.id);
			state.loading = false;
			state.articles = [...removeEditedArticle, action.payload];
		},
		getArticle: (state, action: PayloadAction<IArticleToStore>) => {
			state.loading = false;
			state.currentArticle = action.payload || state.currentArticle;
		},
		removeArticle: (state, action: PayloadAction<IArticleToStore>) => {
			state.loading = false;
			console.log(action.payload);
		},
		addArticle: (state, action: PayloadAction<IArticleToStore>) => {
			state.loading = false;
			state.articles.push(action.payload);
		},
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
