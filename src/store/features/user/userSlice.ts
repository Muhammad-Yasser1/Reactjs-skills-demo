import { ISignUpUserRes, ISignInUserRes } from './../../../shared/interfaces/User.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type mode = 'Admin' | 'Reader';

interface UserState {
	mode: mode;
	loading: boolean;
	isAuth: boolean;
	token: string;
}

const initialState: UserState = {
	mode: 'Reader',
	loading: false,
	isAuth: false,
	token: '',
};

const userSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		signUp: (state, action: PayloadAction<ISignUpUserRes>) => {
			state.token = action.payload.idToken;
			state.isAuth = true;
		},
		signIn: (state, action: PayloadAction<ISignInUserRes>) => {
			state.token = action.payload.idToken;
			state.isAuth = true;
		},
		signOut: (state) => {
			state.token = '';
			state.isAuth = false;
		},
		setMode: (state, action: PayloadAction<mode>) => {
			state.mode = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const { setMode, ...userActions } = userSlice.actions;

export default userSlice.reducer;
