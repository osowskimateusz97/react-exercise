import { api } from './api';

const authors = api.injectEndpoints({
	endpoints: (build) => ({
		getAuthors: build.query({
			query: () => ({
				url: '/authors/all',
			}),
			transformResponse: (response) => response.result,
			providesTags: ['Authors'],
		}),
		createAuthor: build.mutation({
			query: (name) => ({
				url: '/authors/add',
				method: 'POST',
				body: { name: name },
			}),
			invalidatesTags: ['Authors'],
		}),
	}),
});

export const { useGetAuthorsQuery, useCreateAuthorMutation } = authors;
