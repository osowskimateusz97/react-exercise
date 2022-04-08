import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

const authorsSlice = createSlice({
	name: 'authors',
	initialState: [],
	reducers: {
		addAuthor(state, { payload }) {
			const { name, id } = payload;
			state.push({ name, id });
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.getAuthors.matchFulfilled,
			(_, { payload }) => {
				return [...payload];
			}
		);
	},
});

export const { addAuthor } = authorsSlice.actions;

export const getAuthors = (state) => state.authors;

export default authorsSlice.reducer;
