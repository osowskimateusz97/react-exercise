import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

const coursesSlice = createSlice({
	name: 'courses',
	initialState: [],
	reducers: {
		addCourse(state, { payload }) {
			state.push(payload);
		},
		editCourse(state, { payload }) {
			console.log(payload);
		},
		removeCourse(state, { payload: id }) {
			return state.filter((course) => course.id !== id);
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.getCourses.matchFulfilled,
			(_, { payload }) => {
				return [...payload];
			}
		);
	},
});

export const { addCourse, editCourse, removeCourse } = coursesSlice.actions;

export const getCourses = (state) => state.courses;

export default coursesSlice.reducer;
