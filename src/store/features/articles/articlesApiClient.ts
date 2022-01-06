import axios from 'axios';

const articlesApiClient = axios.create({
	baseURL: process.env.REACT_APP_FIREBASE_DB_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export default articlesApiClient;
