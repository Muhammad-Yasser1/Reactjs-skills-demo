import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import articlesReducer from './features/articles/articlesSlice';
import userReducer from './features/user/userSlice';
import { reducer as notificationsReducer } from 'reapop';

const store = configureStore({
	reducer: {
		notifications: notificationsReducer(),
		articlesReducer,
		userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
