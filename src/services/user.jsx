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
		register: build.mutation({
			query: ({ name, email, password }) => ({
				url: '/register',
				method: 'POST',
				body: { name, email, password },
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = user;
