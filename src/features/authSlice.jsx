import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';
import {
	getUserFromLocalStorage,
	removeUserFromLocalStorage,
} from '../utils/localStorage';

const initialState = {
	name: null,
	email: null,
	token: null,
	id: null,
	role: null,
};

const saveUserToLocalStorage = (data) => {
	localStorage.setItem('user', JSON.stringify(data));
};

const authSlice = createSlice({
	name: 'auth',
	initialState: getUserFromLocalStorage() || initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				const token = payload.result;
				state.token = token;
			}
		);
		builder.addMatcher(api.endpoints.logout.matchFulfilled, () => {
			removeUserFromLocalStorage();
			return initialState;
		});
		builder.addMatcher(
			api.endpoints.userInfo.matchFulfilled,
			(state, { payload }) => {
				const {
					result: { name, email, role, id },
				} = payload;
				state.name = name;
				state.email = email;
				state.role = role;
				state.id = id;
				saveUserToLocalStorage({ name, email, id, role, token: state.token });
			}
		);
	},
});

export const getUserInfo = (state) => state.auth;

export default authSlice.reducer;
