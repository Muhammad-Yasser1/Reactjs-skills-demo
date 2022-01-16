import axios from 'axios';
import store from '../..';

const articlesApiClient = axios.create({
    baseURL: process.env.REACT_APP_FIREBASE_DB_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
articlesApiClient.interceptors.request.use((req) => {
    if (req.url?.includes('articles')) {
        const { token } = store.getState().userReducer;
        req.url += `?auth=${token}`;
    }
    return req;
});
export default articlesApiClient;
