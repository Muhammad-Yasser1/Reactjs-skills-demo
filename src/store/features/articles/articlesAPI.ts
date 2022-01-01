import { Article } from './../../../shared/models/Article.model';
import { IArticleToStore } from './../../../shared/interfaces/Article.interface';
import apiClient from '../../apiClient';

export const fetchAll = () => {
	return apiClient
		.get('articles.json')
		.then((res) => {
			const articles: IArticleToStore[] = [];
			for (const key in res.data) {
				if (Object.prototype.hasOwnProperty.call(res.data, key)) {
					const article = res.data[key];
					articles.push({ id: key, ...article });
				}
			}
			return articles;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
};
export const postArticle = (newArticle: Article) => {
	return apiClient
		.post('articles.json', { ...newArticle })
		.then((res) => {
			return { id: res.data.name, ...newArticle };
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
};
