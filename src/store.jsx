import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import authSlice from './features/authSlice';
import coursesSlice from './features/coursesSlice';
import authorsSlice from './features/authorsSlice';

export const store = configureStore({
	reducer: {
		courses: coursesSlice,
		authors: authorsSlice,
		auth: authSlice,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});
