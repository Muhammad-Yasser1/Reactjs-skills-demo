import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type mode = 'Admin' | 'Reader';

interface UserState {
	mode: mode;
	loading: boolean;
	isAuth: boolean;
}

const initialState: UserState = {
	mode: 'Admin',
	loading: false,
	isAuth: false,
};

const userSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		login: (state, action) => {},
		logout: (state, action) => {},
		setMode: (state, action: PayloadAction<mode>) => {
			state.mode = action.payload;
		},
	},
});

export const { login, logout, setMode } = userSlice.actions;

export default userSlice.reducer;
