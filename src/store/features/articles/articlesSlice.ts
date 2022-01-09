import { IArticleToStore } from './../../../shared/interfaces/Article.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Articles = IArticleToStore[];
export type sortTypes = 'a-z' | 'z-a' | 'recent' | 'oldest';
interface ArticleState {
	articles: Articles;
	searchedArticles: Articles;
	currentArticle: IArticleToStore;
	wasArticleFound: boolean;
	loading: boolean;
}

const initialState: ArticleState = {
	articles: [],
	searchedArticles: [],
	currentArticle: { id: '', author: '', content: '', title: '', image: '', created_at: '', updated_at: '' },
	wasArticleFound: true,
	loading: false,
};

const articlesSlice = createSlice({
	name: 'Article',
	initialState,
	reducers: {
		initArticles: (state, action: PayloadAction<Articles>) => {
			state.articles = action.payload;
		},
		getArticle: (state, action: PayloadAction<IArticleToStore | null>) => {
			state.currentArticle = action.payload || state.currentArticle;
		},
		editArticle: (state, action: PayloadAction<IArticleToStore>) => {
			const removeEditedArticle = state.articles.filter((article) => article.id !== action.payload.id);
			state.articles = [...removeEditedArticle, action.payload];
		},
		removeArticle: (state, action: PayloadAction<IArticleToStore | null>) => {
			state.articles = state.articles.filter((article) => article.id !== action.payload?.id);
		},
		addArticle: (state, action: PayloadAction<IArticleToStore | null>) => {
			if (action.payload) {
				state.articles.push(action.payload);
			}
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		wasArticleFound: (state, action: PayloadAction<boolean>) => {
			state.wasArticleFound = action.payload;
		},
		resetCurrentArticle: (state) => {
			state.currentArticle = {
				id: '',
				author: '',
				content: '',
				title: '',
				image: '',
				created_at: '',
				updated_at: '',
			};
		},
		sortArticles: (state, action: PayloadAction<sortTypes>) => {
			switch (action.payload) {
				case 'a-z':
					state.articles.sort((a, b) => {
						return a.title.localeCompare(b.title);
					});
					break;
				case 'z-a':
					state.articles.sort((a, b) => {
						return b.title.localeCompare(a.title);
					});
					break;
				case 'recent':
					state.articles.sort((a, b) => {
						return b.updated_at.localeCompare(a.updated_at);
					});
					break;
				case 'oldest':
					state.articles.sort((a, b) => {
						return a.updated_at.localeCompare(b.updated_at);
					});
					break;
				default:
					break;
			}
		},
		searchArticles: (state, action: PayloadAction<string>) => {
			if (action.payload === '') {
				state.searchedArticles = state.articles;
			} else {
				state.searchedArticles = state.articles.filter((article) =>
					article.title.toLowerCase().includes(action.payload.toLowerCase())
				);
			}
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
