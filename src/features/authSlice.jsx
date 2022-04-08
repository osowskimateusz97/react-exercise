import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';
import {
	getUserFromLocalStorage,
	removeUserFromLocalStorage,
} from '../utils/localStorage';

const initialState = {
	name: null,
	email: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState: getUserFromLocalStorage() || initialState,
	reducers: {
		signOut(state) {
			state.name = null;
			state.email = null;
			removeUserFromLocalStorage();
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(api.endpoints.login.matchFulfilled, (_, { payload }) => {
			const { email, name } = payload.user;
			localStorage.setItem('user', JSON.stringify({ name, email }));
			return { name, email };
		});
		builder.addMatcher(api.endpoints.register.matchFulfilled, (_, { meta }) => {
			const { name, email } = meta.arg.originalArgs;

			localStorage.setItem('user', JSON.stringify({ name, email }));
			return { name, email };
		});
	},
});

export const { signOut } = authSlice.actions;

export const getUserInfo = (state) => state.auth;

export default authSlice.reducer;
