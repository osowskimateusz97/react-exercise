import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import authSlice from './features/authSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});
