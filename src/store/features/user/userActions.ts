import { notify } from 'reapop';
import { ISignInUserRes } from './../../../shared/interfaces/User.interface';
import { signUpUserReq, signInUserReq } from './userAPI';
import { IUserCred } from '../../../shared/interfaces/UserCred.interface';
import { Dispatch } from '@reduxjs/toolkit';
import { userActions } from './userSlice';
import { ISignUpUserRes } from '../../../shared/interfaces/User.interface';
import localStorageApi from './localStorageApi';

export const signUpUser =
	({ email, password }: IUserCred) =>
	async (dispatch: Dispatch) => {
		const { status, data }: { status: number; data: ISignUpUserRes } = await signUpUserReq(
			{ email, password },
			dispatch
		);
		if (status === 200) {
			dispatch(notify(`${data.email} Signed up successfully!`, 'success'));
			dispatch(userActions.signUp(data));
			localStorageApi.saveToken({ token: data.idToken, expiresIn: data.expiresIn });
			return data;
		}
	};

export const signInUser =
	({ email, password }: IUserCred) =>
	async (dispatch: Dispatch) => {
		const { status, data }: { status: number; data: ISignInUserRes } = await signInUserReq(
			{ email, password },
			dispatch
		);
		if (status === 200) {
			dispatch(notify(`${data.email} Signed in successfully!`, 'success'));
			dispatch(userActions.signIn(data));
			localStorageApi.saveToken({ token: data.idToken, expiresIn: data.expiresIn });
			return data;
		}
	};
