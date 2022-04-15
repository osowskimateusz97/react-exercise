import { api } from './api';

const user = api.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation({
			query: ({ email, password }) => ({
				url: '/login',
				method: 'POST',
				body: { email, password },
			}),
		}),
		userInfo: build.mutation({
			query: () => '/users/me',
		}),
		register: build.mutation({
			query: ({ name, email, password }) => ({
				url: '/register',
				method: 'POST',
				body: { name, email, password },
			}),
		}),
		logout: build.mutation({
			query: () => ({
				url: '/logout',
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useUserInfoMutation,
} = user;
